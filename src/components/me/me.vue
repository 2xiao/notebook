<template>
  <div id="chat">
    <div id="chat-body">
      <div id="chat-body-bg"></div>
      <div id="chat-body-content">
        <div id="mock-msg-row" class="msg-row">
          <div id="mock-msg" class="msg" v-html="latestMsgContent"></div>
        </div>
        <div class="msg-row"
            v-for="(msg, index) in messages"
            :key="index"
            :class="msg.author === 'xianzhe' ? 'msg-xianzhe' : 'msg-me'">
          <div class="msg"
              :class="'msg-bounce-in-' + (msg.author === 'xianzhe' ? 'left': 'right')"
              :style="msg.width && msg.height && {width: msg.width - 26 + 'px', height: msg.height - 18 + 'px'}"
              v-html="msg.content"></div>
        </div>
      </div>
    </div>
    <div id="chat-foot">
      <div id="prompt">
          <div id="prompt-head">
              <div class="say-something">说点什么啊啊……</div>
              <a href="javascript:;" class="close-btn"
                  v-on:click="togglePrompt(false)"></a>
          </div>
          <div id="prompt-body">
              <ul class="responses" v-if="lastDialog">
                  <li v-for="res in lastDialog.responses">
                      <a href="javascript:;" v-on:click="respond(res)">{{ res.content }}</a>
                  </li>
              </ul>
              <div class="next-topic"
                  v-if="!lastDialog || !lastDialog.responses">
                  <ul class="topics">
                      <li v-for="topic in nextTopics">
                          <a href="javascript:;" v-on:click="ask(topic)">{{ topic.brief }}</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <div id="input-hint" class="say-something"
      v-on:click="togglePrompt(true)"
      :class="{'clickable': !isErXiaoTyping }">
        <span v-if="!isErXiaoTyping">说点什么……</span>
        <span v-if="isErXiaoTyping">二小正在输入中</span>
      </div>
    </div>
    <div id="prompt-bg" v-on:click="togglePrompt(false)"></div>
  </div>
</template>

<script>
import $ from 'jquery'

var _gaq = _gaq || []
_gaq.push(['_setAccount', 'UA-38205696-1'])
_gaq.push(['_trackPageview'])

const AUTHOR = {
  XIANZHE: 'xianzhe',
  ME: 'me'
}

const TYPING_MSG_CONTENT = `
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
`

export default {
  data () {
    return {
      messages: [],
      lastDialog: null,
      msgChain: Promise.resolve(),
      dialogs: null,
      isErXiaoTyping: false,
      // topics that user can ask
      nextTopics: [],
      hasPrompt: false,
      latestMsgContent: null
    }
  },
  mounted () {
    this.$ajax.get('./static/dialog.json').then(data => {
      this.dialogs = data
      this.nextTopics = this.dialogs.fromUser
      this.appendDialog('0000')
    })
  },
  methods: {
    appendDialog (id) {
      if (typeof id === 'object' && id.length > 0) {
        // array of dialog ids
        id.forEach(id => this.appendDialog(id))
        return
      } else if (id == null) {
        // clear possible responses
        this.lastDialog.responses = null
        return
      }
      this.isErXiaoTyping = true
      const dialog = this.getDialog(id)
      getRandomMsg(dialog.details)
        .forEach(content => {
          this.msgChain = this.msgChain
            .then(() => delay(700))
            .then(() => this.sendMsg(content, AUTHOR.XIANZHE))
        })
      return dialog.nextXianzhe
        ? this.appendDialog(dialog.nextXianzhe)
        : this.msgChain.then(() => {
          this.lastDialog = dialog
          this.isErXiaoTyping = false
        })
    },

    getDialog (id) {
      // only one dialog should be matched by id
      const dialogs = this.dialogs.data.fromXianzhe
        .filter(dialog => dialog.id === id)
      return dialogs ? dialogs[0] : null
    },

    sendMsg (message, author) {
      switch (author) {
        case 'me':
          return this.sendUserMsg(message)
        default:
          return this.sendFriendMsg(message, author)
      }
    },

    sendFriendMsg (message, author) {
      const content = getRandomMsg(message)
      const length = content.replace(/<[^>]+>/g, '').length
      const isImg = /<img[^>]+>/.test(content)
      const isTyping = length > 5 || isImg
      const msg = {
        author: author,
        content: isTyping ? TYPING_MSG_CONTENT : content,
        isImg: isImg
      }
      this.messages.push(msg)
      if (isTyping) {
        this.markMsgSize(msg)
        setTimeout(updateScroll)

        return delay(Math.min(100 * length, 2000))
          .then(() => {
            return this.markMsgSize(msg, content)
          })
          .then(() => delay(150))
          .then(() => {
            msg.content = content
            onMessageSending()
          })
      }

      onMessageSending()

      return Promise.resolve()
    },

    sendUserMsg (message) {
      this.messages.push({
        author: AUTHOR.ME,
        content: message
      })

      onMessageSending()

      return Promise.resolve()
    },

    markMsgSize (msg, content = null) {
      this.latestMsgContent = content || msg.content

      return delay(0)
        .then(() => msg.isImg && onImageLoad($('#mock-msg img')))
        .then(() => {
          Object.assign(msg, getMockMsgSize())
          this.messages = [...this.messages]
        })
    },

    getDialogFromUser (id) {
      // only one dialog should be matched by id
      const dialogs = this.dialogs.fromUser
        .filter(dialog => dialog.id === id)
      return dialogs ? dialogs[0] : null
    },

    togglePrompt (toShow) {
      if (this.isErXiaoTyping) {
        // don't prompt if xianzhe is typing
        return
      }
      this.hasPrompt = toShow
    },

    respond (response) {
      // send to ga
      if (_gaq) {
        _gaq.push(['_trackEvent', 'Home', 'respond', response.content])
      }

      return this.say(response.content, response.nextXianzhe)
    },

    ask (fromUser) {
      // send to ga
      if (_gaq) {
        _gaq.push(['_trackEvent', 'Home', 'ask', fromUser.brief])
      }
      const content = getRandomMsg(fromUser.details)
      return this.say(content, fromUser.nextXianzhe)
    },

    say (content, dialogId) {
      // close prompt
      this.hasPrompt = false

      return delay(200)
        // send user msg
        .then(() => this.sendMsg(content, AUTHOR.ME))
        .then(() => delay(300))
        // add xianzhe's next dialogs
        .then(() => this.appendDialog(dialogId))
    }
  }
}

/**
 * get a random message from message array
 */
function getRandomMsg (messages) {
  // single item
  if (typeof messages === 'string' || !messages.length) {
    return messages
  }

  const id = Math.floor(Math.random() * messages.length)
  return messages[id]
}

function delay (amount = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, amount)
  })
}

/**
 * UI updating when new message is sending
 */
function onMessageSending () {
  setTimeout(() => {
    // update scroll position when vue has updated ui
    updateScroll()

    const $latestMsg = $('#chat-body-content .msg-row:last-child .msg')

    // add target="_blank" for links
    $latestMsg.find('a').attr('target', '_blank')

    // update scroll position when images are loaded
    onImageLoad($latestMsg).then(updateScroll)
  })
}

function updateScroll () {
  const $chatbox = $('#chat-body-content')

  const distance = $chatbox[0].scrollHeight - $chatbox.height() - $chatbox.scrollTop()
  const duration = 250
  const startTime = Date.now()

  requestAnimationFrame(function step () {
    const p = Math.min(1, (Date.now() - startTime) / duration)
    $chatbox.scrollTop($chatbox.scrollTop() + distance * p)
    p < 1 && requestAnimationFrame(step)
  })
}

function onImageLoad ($img) {
  return new Promise(resolve => {
    $img.one('load', resolve)
      .each((index, target) => {
        // trigger load when the image is cached
        target.complete && $(target).trigger('load')
      })
  })
}

function getMockMsgSize () {
  const $mockMsg = $('#mock-msg')
  return {
    width: $mockMsg.width(),
    height: $mockMsg.height()
  }
}

</script>

<style scoped>
@-webkit-keyframes msgBounceIn{
  from,to{
  -webkit-animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1);
  animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}
  from{-webkit-transform:scale(0);
  transform:scale(0)}
  40%{-webkit-transform:scale(1.03);
  transform:scale(1.03)}
  75%{-webkit-transform:scale(0.98);
  transform:scale(0.98)}
  to{-webkit-transform:scale(1);
  transform:scale(1)}
}

@keyframes msgBounceIn{
  from,to{
  -webkit-animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1);
  animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}
  from{-webkit-transform:scale(0);
  transform:scale(0)}
  40%{-webkit-transform:scale(1.03);
  transform:scale(1.03)}
  75%{-webkit-transform:scale(0.98);
  transform:scale(0.98)}
  to{-webkit-transform:scale(1);
  transform:scale(1)}
}

@-webkit-keyframes dotZoomIn{
  from,40%,80%,100%{
  -webkit-animation-timing-function:ease-in-out;
  animation-timing-function:ease-in-out}
  from{-webkit-transform:scale(0);
  transform:scale(0)}
  40%{-webkit-transform:scale(1);
  transform:scale(1)}
  80%{-webkit-transform:scale(0);
  transform:scale(0)}
  100%{-webkit-transform:scale(0);
  transform:scale(0)}
}
  
@keyframes dotZoomIn{
  from,40%,80%,100%{
  -webkit-animation-timing-function:ease-in-out;
  animation-timing-function:ease-in-out}
  from{-webkit-transform:scale(0);
  transform:scale(0)}
  40%{-webkit-transform:scale(1);
  transform:scale(1)}
  80%{-webkit-transform:scale(0);
  transform:scale(0)}
  100%{-webkit-transform:scale(0);
  transform:scale(0)}
}

#chat {
  width:auto;
  overflow:hidden;
  position:absolute;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, #6ca6c3 0%,#b5e2ec 100%);
}
#chat.has-prompt:after {
  -webkit-border-radius:0 !important;
  border-radius:0 !important
}

#chat-body {
  position:absolute;
  top:0;
  bottom:45px;
  width:100%;
  /*background:#E8F9F6;*/
}

#chat-body a{
  color:#22c3aa;
  text-decoration:none;
}

#chat-body-bg{
  width:100%;
  height:100%;
}

#chat-body-bg:before,#chat-body-bg:after{
  content:'';
  display:block;
  z-index:10
}

#chat-body-bg:before{
  position:relative;
  width:100%;
  height:25px;
  background:-webkit-gradient(linear, left top, left bottom, color-stop(0, rgba(34,195,170,0.1)), color-stop(0, transparent));
  background:-webkit-linear-gradient(rgba(34,195,170,0.1) 0, transparent);
  background:linear-gradient(rgba(34,195,170,0.1) 0, transparent)
}

#chat-body-bg:after{
  position:absolute;
  bottom:0;
  width:100%;
  height:15px;
  background:-webkit-gradient(linear, left top, left bottom, color-stop(0, transparent), to(rgba(34,195,170,0.05)));
  background:-webkit-linear-gradient(transparent 0, rgba(34,195,170,0.05) 100%);
  background:linear-gradient(transparent 0, rgba(34,195,170,0.05) 100%)
}

#chat-body-content{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  padding:16px 10px 16px 18px;
  overflow-x:hidden;
  overflow-y:scroll;
  -webkit-overflow-scrolling:touch;
  color:#666;
  z-index:1
}

#chat-body-content::-webkit-scrollbar{
  width:8px
}

#chat-body-content::-webkit-scrollbar-thumb{
  background-color:#bdf4eb;
  -webkit-border-radius:4px;
  border-radius:4px
}

#prompt-body {
  -webkit-border-radius:0 !important;
  border-radius:0 !important
}

#chat-foot {
  position:absolute;
  bottom:0;
  width:100%;
  height:44px;
  background:white;
  border-top:1px solid #f3f3f3
}

.say-something {
  padding:10px 25px;
  color:#bbb;
}

#mock-msg-row {
  position:absolute;
  top:-1000px;
  left:18px;
  right:10px;
  visibility:hidden
}

.msg-row {
  margin-bottom:10px
}

.msg-row::before,.msg-row::after {
  content:" ";
  display:table
}

.msg-row::after {

  clear:both
}

.msg-xianzhe {
  margin-bottom:20px
}

.msg-xianzhe+.msg-xianzhe {
  margin-top:-15px
}

.msg-me {
  margin-bottom:20px
}

.msg-me+.msg-me {
  margin-top:-15px
}

.msg {
  display:inline-block;
  padding:9px 14px;
  max-width:65%;
  overflow:hidden;
  word-wrap:break-word;
  font-size:14px;
  line-height:24px;
  background:white;
  -webkit-border-radius:20px;
  border-radius:20px;
  -webkit-box-shadow:5px 5px 15px 0 rgba(102,102,102,0.1);
  box-shadow:5px 5px 15px 0 rgba(102,102,102,0.1);
  -webkit-transition:width .12s ease-out, height .12s ease-out;
  transition:width .12s ease-out, height .12s ease-out;
  -webkit-transform:translate3d(0, 0, 0);
  transform:translate3d(0, 0, 0)
}

.msg-xianzhe .msg {
  -webkit-border-radius:0 20px 20px 20px;
  border-radius:0 20px 20px 20px;
}

.msg-me .msg {
  float:right;
  color:white;
  -webkit-border-radius:20px 20px 0 20px;
  border-radius:20px 20px 0 20px;
  -webkit-box-shadow:5px 5px 15px 0 rgba(102,102,102,0.15);
  box-shadow:5px 5px 15px 0 rgba(102,102,102,0.15);
}

.msg img {
  margin:8px 0
}

.msg .dot {
  position:relative;
  display:inline-block;
  width:10px;
  height:10px;
  background:#b0e9e0;
  -webkit-border-radius:50%;
  border-radius:50%;
  -webkit-transform-origin:50% 50%;
  -ms-transform-origin:50% 50%;
  transform-origin:50% 50%;
  -webkit-animation:dotZoomIn 1.4s infinite;
  animation:dotZoomIn 1.4s infinite
}

.msg .dot:first-child {
  -webkit-animation-delay:-0.32s;
  animation-delay:-0.32s
}

.msg .dot:nth-child(2) {
  -webkit-animation-delay:-0.16s;
  animation-delay:-0.16s
}

.msg .dot+.dot {
  margin-left:5px
}

.msg-bounce-in-left {
  -webkit-transform-origin:0 0;
  -ms-transform-origin:0 0;
  transform-origin:0 0;
  -webkit-animation:msgBounceIn .4s;
  animation:msgBounceIn .4s;
  float: left;
}

.msg-bounce-in-right {
  -webkit-transform-origin:100% 100%;
  -ms-transform-origin:100% 100%;
  transform-origin:100% 100%;
  -webkit-animation:msgBounceIn .4s;
  animation:msgBounceIn .4s;
  float: right;
}

#input-hint.clickable{
  cursor:pointer;
}

#prompt-bg{opacity:0}

#mobile.has-prompt #prompt-bg{
  position:absolute;
  top:0;
  z-index:50;
  display:block;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  -webkit-border-radius:20px;
  border-radius:20px;
  opacity:1;
  -webkit-transition:opacity .3s;
  transition:opacity .3s
}

#prompt{
  position:absolute;
  bottom:0;
  -webkit-transform:translateY(100%);
  -ms-transform:translateY(100%);
  transform:translateY(100%);
  z-index:100;
  width:100%;
  -webkit-box-shadow:0 0 30px 0 rgba(0,0,0,0.2);
  box-shadow:0 0 30px 0 rgba(0,0,0,0.2);
  -webkit-transition-duration:.3s;
  transition-duration:.3s;
  -webkit-transition-property:-webkit-transform;
  transition-property:-webkit-transform;
  transition-property:transform;
  transition-property:transform, -webkit-transform
}

#mobile.has-prompt #prompt{
  -webkit-transform:translateY(0);
  -ms-transform:translateY(0);
  transform:translateY(0)
}

#prompt-head{position:relative;
  border-bottom:1px solid #f3f3f3;
  background-color:white
}


#prompt-head .say-something{
  padding-top:12px;
  padding-bottom:12px
}

.close-btn{
  position:absolute;
  top:0;
  right:0;
  height:20px;
  padding:12px 18px
}

.close-btn:before,.close-btn:after{
  content:'';
  display:block;
  width:16px;
  height:2px;
  position:relative;
  top:8px;
  background-color:#ddd
}

.close-btn:before{
  top:10px;
  -webkit-transform:rotateZ(45deg);
  -ms-transform:rotate(45deg);
  transform:rotateZ(45deg)
}

.close-btn:after{
  -webkit-transform:rotateZ(-45deg);
  -ms-transform:rotate(-45deg);
  transform:rotateZ(-45deg)
}

#prompt-body{
  background-color:white;
  overflow:hidden
}

#prompt-body .responses li{
  border-bottom:1px solid #f3f3f3
}

#prompt-body .responses li:last-child{
  border-bottom:none
}

#prompt-body .responses li a{
  display:block;
  height:100%;
  padding:12px 18px;
  color:#666;
  text-decoration:none
}

#prompt-body .responses li a:hover{
  text-decoration:none
}

#prompt-body .next-topic{
  padding:12px 18px
}

#prompt-body .next-topic h3{
  margin:0 0 12px 0;
  font-size:14px;
  font-weight:normal;
  color:#bbb
}

#prompt-body .next-topic .topics{
  text-align:center
}

#prompt-body .next-topic .topics li{
  display:inline-block;
  margin:5px 3px
}

#prompt-body .next-topic .topics li a{
  display:block;
  padding:5px 12px;
  margin-right:5px;
  -webkit-border-radius:20px;
  border-radius:20px;
  text-decoration:none;
  color:white
}

#prompt-body .next-topic .topics li a:hover{
  text-decoration:none
}

#prompt-head .say-something{
  padding-top:15px;
  padding-bottom:15px
}

#prompt-body .responses li a{
  padding:15px 21px
}


</style>
