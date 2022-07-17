import fs from 'fs'
import kill from 'tree-kill'

const serverPid = fs.readFileSync('.server.pid', {
  encoding: 'utf8'
})
fs.unlinkSync('.server.pid')

kill(serverPid)