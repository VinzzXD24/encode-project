// server.js
const express = require("express");
const bodyParser = require("body-parser");
const vm = require("vm");

const app = express();
const port = 3000;

app.use(bodyParser.json());
// Menyajikan file statis (misalnya index.html) dari direktori saat ini
app.use(express.static("."));

// Endpoint untuk menjalankan kode Node.js
app.post("/run", (req, res) => {
  const code = req.body.code;
  if (!code) {
    return res.json({ error: "Tidak ada kode yang dikirim." });
  }
  
  // Simulasikan delay 3 detik untuk efek loading
  setTimeout(() => {
    try {
      // Membuat sandbox untuk menangkap log output
      let output = "";
      const sandboxConsole = {
        log: (...args) => { output += args.join(" ") + "\n"; },
        error: (...args) => { output += "Error: " + args.join(" ") + "\n"; }
      };
      // Sandbox dengan menyediakan objek console, require, module, dan exports
      const sandbox = {
        console: sandboxConsole,
        require, module, exports, process
      };
      vm.createContext(sandbox);
      const script = new vm.Script(code);
      // Jalankan kode di sandbox dengan timeout 5 detik
      script.runInContext(sandbox, { timeout: 5000 });
      res.json({ result: output || "✅ Kode berhasil dijalankan di Node.js tanpa error!" });
    } catch (err) {
      let errorDetails = "❌ Error: " + err.message;
      if (err.stack) {
        const stackLines = err.stack.split("\n");
        if (stackLines.length > 1) {
          errorDetails += "\nKomentar: Error terjadi di " + stackLines[1].trim();
        } else {
          errorDetails += "\n" + err.stack;
        }
      }
      res.json({ error: errorDetails });
    }
  }, 3000);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
