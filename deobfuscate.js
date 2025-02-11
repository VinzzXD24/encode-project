// deobfuscate.js
// Fungsi untuk "deobfuscate" (beautify) kode menggunakan js-beautify
function deobfuscateCode(code) {
  // Opsi untuk js-beautify; sesuaikan jika diperlukan
  var options = {
    indent_size: 2,
    space_in_empty_paren: true
  };
  return js_beautify(code, options);
}
