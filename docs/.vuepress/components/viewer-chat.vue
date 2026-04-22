<template>
  <div class="chat-viewer">
    <div class="import-bar">
      <label class="btn">
        导入JSON
        <input type="file" @change="handleFileSelect" accept=".json" style="display: none">
      </label>
      <span class="file-name">{{ fileName || '请选择与opencode聊天记录的JSON文件' }}</span>
    </div>
    <div class="header">
      <span>{{ title }}</span>
    </div>
    <div class="chat-container">
      <div v-if="messages.length === 0" class="empty-state">
        <!-- 请导入JSON文件查看聊天记录 -->
      </div>
      <template v-else>
        <div v-for="(msg, index) in messages" :key="index" :class="['message-item', msg.role]">
          <div class="avatar">{{ msg.role === 'user' ? '我' : 'AI' }}</div>
          <div class="message-content">
            <template v-for="part in msg.parts" :key="part.id">
              <div v-if="part.type === 'reasoning'" class="reasoning">
                [思考] {{ part.text }}
              </div>
              <div v-if="part.type === 'tool'" class="tool-call">
                [工具] {{ part.tool }}
                <div v-if="part.state?.output" class="tool-output">
                  {{ part.state.output.substring(0, 500) }}
                </div>
              </div>
            </template>
            <div v-if="msg.text" class="message-bubble" v-html="parseMarkdown(msg.text)"></div>
            <div v-if="msg.time" class="timestamp">{{ formatTime(msg.time) }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatViewer',
  data() {
    return {
      title: '',
      fileName: '',
      messages: []
    }
  },
  methods: {
    handleFileSelect(e) {
      const file = e.target.files[0]
      if (!file) return
      this.fileName = file.name
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result)
          this.title = data.info?.title || '聊天记录'
          this.messages = (data.messages || [])
            .filter(msg => msg.info?.role && msg.info?.role !== 'system')
            .map(msg => {
              const parts = (msg.parts || []).map(part => ({
                id: part.id,
                type: part.type,
                text: part.text,
                tool: part.tool,
                state: part.state
              }))
              const textParts = parts.filter(p => p.type === 'text').map(p => p.text)
              return {
                role: msg.info.role,
                time: msg.info?.time?.created,
                parts,
                text: textParts.join('')
              }
            })
          this.$nextTick(() => {
            window.scrollTo(0, document.body.scrollHeight)
          })
        } catch (error) {
          this.messages = []
          console.error(error)
        }
      }
      reader.readAsText(file)
    },
    parseMarkdown(text) {
      if (!text) return ''
      let html = text

      html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        return '<pre style="background:#1a1a1a;color:#00ffff;padding:10px;border-radius:6px;overflow-x:auto;font-size:13px;margin:8px 0"><code>' + this.escapeHtml(code.trim()) + '</code></pre>'
      })

      html = html.replace(/`([^`]+)`/g, '<code style="background:#f0f0f0;padding:2px 6px;border-radius:4px;font-size:13px">$1</code>')
      html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')

      const tableRegex = /\|(.+)\|\n\|([-:\s|]+)\|\n((?:\|.+\|\n?)+)/g
      html = html.replace(tableRegex, (match, header, separator, body) => {
        const headers = header.split('|').map(h => h.trim()).filter(h => h)
        const rows = body.trim().split('\n').map(row => {
          return row.split('|').map(c => c.trim()).filter(c => c)
        })
        let table = '<table style="border-collapse:collapse;width:100%;margin:8px 0;font-size:13px"><thead><tr>'
        for (const h of headers) {
          table += '<th style="border:1px solid #ddd;padding:6px 8px;background:#f5f5f5;text-align:left">' + h + '</th>'
        }
        table += '</tr></thead><tbody>'
        for (const row of rows) {
          table += '<tr>'
          for (const cell of row) {
            table += '<td style="border:1px solid #ddd;padding:6px 8px">' + cell + '</td>'
          }
          table += '</tr>'
        }
        table += '</tbody></table>'
        return table
      })

      html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
      html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
      // html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')
      html = html.replace(/^\- (.+)$/gm, '<li style="margin:4px 0;margin-left:20px">$1</li>')
      html = html.replace(/^(\d+)\. (.+)$/gm, '<li style="margin:4px 0;margin-left:20px">$2</li>')
      html = html.replace(/\n\n/g, '</p><p style="margin:8px 0">')
      html = '<p style="margin:8px 0">' + html + '</p>'

      return html
    },
    escapeHtml(text) {
      return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    },
    formatTime(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return month + '月' + day + '日 ' + hours + ':' + minutes
    }
  }
}
</script>

<style scoped>
.chat-viewer {
  max-width: 800px;
  margin: 0 auto;
}

.header {
  color: #ff8000;
  padding: 16px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  top: 0;
}

.import-bar {
  background: white;
  padding: 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.import-bar .btn {
  background: #ff8000;
  color: white;
  padding: 10px 24px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
}

.file-name {
  font-size: 14px;
  color: #666;
}

.chat-container {
  padding: 10px 0;
}

.message-item {
  display: flex;
  margin-bottom: 16px;
  padding: 0 16px;
}

.message-item.user {
  flex-direction: row-reverse;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  flex-shrink: 0;
  background: #34C759;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.message-item.assistant .avatar {
  background: #ff8000;
}

.message-content {
  margin: 0 12px;
  max-width: calc(100% - 100px);
}

.message-bubble {
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 15px;
  line-height: 1.5;
  word-break: break-word;
}

.message-item.user .message-bubble {
  background: #34C759;
  color: white;
  border-top-right-radius: 2px;
}

.message-item.assistant .message-bubble {
  background: white;
  color: #000;
  border-top-left-radius: 2px;
}

.timestamp {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.message-item.user .timestamp {
  text-align: right;
}

.reasoning {
  background: #f0f0f0;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  color: #666;
  margin: 8px 12px;
  font-style: italic;
}

.tool-call {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: #ff8000;
  margin: 4px 0;
  border-left: 3px solid #ff8000;
}

.tool-output {
  background: #1a1a1a;
  color: #00ff00;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-family: monospace;
  margin: 4px 0;
  max-height: 200px;
  overflow-y: auto;
  white-space: pre-wrap;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}
</style>