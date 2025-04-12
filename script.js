/** @format */

// kirim ke backend http://localhost:3000/upload

formIsian.addEventListener("submit", async e => {
  try {
    e.preventDefault();
    btnKirim.innerHTML = "Mengirim";
    btnKirim.setAttribute("disabled", "");

    const res = await fetch(
      "https://api-pesan-anonim-production.up.railway.app/upload",
      {
        method: "post",
        body: new FormData(formIsian)
      }
    );

    const hasil = await res.json();

    notif.innerHTML = hasil?.error || hasil?.balasan;
    notif.style.display = "flex";

    setTimeout(function () {
      notif.style.display = "none";
      notif.innerHTML = "";
    }, 2000);

    if (hasil.status != "tahan") {
      formIsian.reset();
      hapusPre();
      btnKirim.innerHTML = "kirim lagi";
    } else {
      btnKirim.innerHTML = "kirim";
      console.log("pengiriman di tahan");
    }
    btnKirim.removeAttribute("disabled");
  } catch (e) {
    notif.innerHTML = e || "gangguan";
  }
});

// ambil semua elemen yang dibutuhkan
const hapusIMG = document.querySelector(".hapusIMG");
const inputFile = document.querySelector("#inputFile");
const preview = document.querySelector(".preview");
const previewMedia = document.querySelector("#previewMedia");

// jika ada perubahan di input
inputFile.addEventListener("change", function (event) {
  // ambil file di input
  const file = event.target.files[0];

  // cek apakah ada file
  if (file) {
    // baca file
    const readerInput = new FileReader();

    readerInput.onload = function (e) {
      // jika tipenya gambar
      if (file.type.startsWith("image/")) {
        previewMedia.innerHTML = `
        <img src="${e.target.result}">
        `;
      }
      // jika tipenya video
      else if (file.type.startsWith("video/")) {
        previewMedia.innerHTML = `
        <video src="${e.target.result}" controls></video>
        `;
      } else {
        inputFile.value = "";
        previewMedia.innerHTML = `<p class="fileTidakSuport">dokument ini tidak didukungu9</p>`;
      }
      // tampilkan di UI
      preview.style.display = "block";
    };
    readerInput.readAsDataURL(file);
  }
});

// saat tombol hapus di atas kirim gambar di click
hapusIMG.addEventListener("click", () => {
  hapusPre();
});

function hapusPre(e) {
  preview.style.display = "none";
  inputFile.value = "";
  previewMedia.innerHTML = "";
}
