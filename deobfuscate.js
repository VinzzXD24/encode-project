// fullDeobfuscate.js

/**
 * Fungsi ini mensimulasikan proses deobfuscation yang memakan waktu.
 * Karena mengembalikan kode asli dari obfuscation yang kuat hampir tidak mungkin,
 * di sini kita hanya melakukan beautify (format ulang) sebagai simulasi.
 *
 * progressCallback: fungsi untuk update progress (misal, update progress bar).
 * completionCallback: fungsi yang dipanggil saat proses selesai dengan hasil akhir.
 */
function simulateDeobfuscation(code, progressCallback, completionCallback) {
  let progress = 0;
  // Misal, kita simulasikan proses selama 20 detik.
  let interval = setInterval(function() {
    // Update progress secara acak (tambah 1-5 persen setiap detik)
    progress += Math.floor(Math.random() * 5) + 1;
    if (progress > 100) progress = 100;
    progressCallback(progress);
    if (progress === 100) {
      clearInterval(interval);
      // Setelah selesai simulasi, tambahkan delay tambahan untuk efek proses berat
      setTimeout(function() {
        // Di sini kita menggunakan js_beautify untuk "deobfuscate" (beautify) kode.
        // Catatan: Beautification hanya mengatur ulang format, bukan mengembalikan nama asli.
        let deobfuscated = js_beautify(code, {
          indent_size: 2,
          space_in_empty_paren: true
        });
        completionCallback(deobfuscated);
      }, 2000); // tambahan delay 2 detik
    }
  }, 1000); // update setiap detik
}

// Tangani event ketika tombol "Start Deobfuscation" diklik.
document.getElementById("startDeobfuscateBtn").addEventListener("click", function() {
  let fileInput = document.getElementById("fileInput");
  let outputArea = document.getElementById("outputArea");
  let progressBar = document.getElementById("progressBar");
  let progressText = document.getElementById("progressText");

  if (fileInput.files.length === 0) {
    alert("Silakan pilih file .js terlebih dahulu.");
    return;
  }
  let file = fileInput.files[0];
  let reader = new FileReader();
  reader.onload = function(e) {
    let code = e.target.result;
    outputArea.textContent = ""; // Bersihkan output sebelumnya
    progressBar.style.width = "0%";
    progressText.textContent = "Progress: 0%";

    // Mulai simulasi proses deobfuscation
    simulateDeobfuscation(code, function(progress) {
      progressBar.style.width = progress + "%";
      progressText.textContent = "Progress: " + progress + "%";
    }, function(deobfuscatedCode) {
      outputArea.textContent = deobfuscatedCode;
    });
  };
  reader.onerror = function(e) {
    alert("Gagal membaca file: " + e.target.error);
  };
  reader.readAsText(file);
});
