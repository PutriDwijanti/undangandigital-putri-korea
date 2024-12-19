// @ts-nocheck
function bukaUndangan() {
    // Pilih semua elemen dengan pengecekan jika elemen tidak ditemukan
    const c1 = document.querySelector('#cover');
    const c2 = document.querySelector('#quotes');
    const c3 = document.querySelector('#profile');
    const c4 = document.querySelector('#wedding-event');
    const c5 = document.querySelector('#peta');
    const c6 = document.querySelector('#Gallery');
    const c7 = document.querySelector('#tamu_spesial');
    const c8 = document.querySelector('#rsvp');
    const c9 = document.querySelector('#story');
    const c10 = document.querySelector('#hadiah');
    const c11 = document.querySelector('#pesan');
    const c12 = document.querySelector('#terimakasih');
 
    // Logging untuk membantu debugging
    console.log('Element cover:', c1);
    console.log('Element musik:', document.querySelector('#kotak-musik'));
    console.log('Element tombolMusik:', document.querySelector('#tombol-musik'));
    
    // Hanya ubah style jika elemen ditemukan
    if (c1) c1.style.display = 'none';
    if (c2) c2.style.display = 'block';
    if (c3) c3.style.display = 'block';
    if (c4) c4.style.display = 'block';
    if (c5) c5.style.display = 'block';
    if (c6) c6.style.display = 'block';
    if (c7) c7.style.display = 'block';
    if (c8) c8.style.display = 'block';
    if (c9) c9.style.display = 'block';
    if (c10) c10.style.display = 'block';
    if (c11) c11.style.display = 'block';
    if (c12) c12.style.display = 'block';
    
 
    // Tampilkan kontrol musik jika ada
    const musik = document.querySelector('#kotak-musik');
    if (musik) musik.style.display = 'block';
 
    const tombolMusik = document.querySelector('#tombol-musik');
    if (tombolMusik) tombolMusik.style.display = 'block';
 
    const lagu = document.querySelector('#lagu');
    if (lagu) lagu.play();  // Mainkan musik jika elemen ditemukan
 }
 
 function putarLagu() {
    const lagu = document.querySelector('#lagu');
    const tombol = document.querySelector('#kontrol');

    // Logging untuk memastikan elemen ditemukan
    console.log('Element lagu:', lagu);
    console.log('Element tombol:', tombol);
 
    // Pastikan elemen tombol dan lagu ditemukan sebelum mengubah status
    if (lagu && tombol) {
        if (lagu.paused) {
            lagu.play();  
            tombol.src = 'assets/img/musicoff.png';  // Ikon musik mati saat musik diputar
        } else {
            lagu.pause();  
            tombol.src = 'assets/img/musicon.png';  // Ikon musik hidup saat musik dihentikan
        }
    } else {
        console.error("Lagu atau tombol tidak ditemukan.");
    }
 }
 
 document.addEventListener('DOMContentLoaded', function () {
    // Siapkan animasi scroll untuk section
    const sectionContents = document.querySelectorAll('.section_content');
    
    if (sectionContents.length > 0) {
        // Fungsi untuk memulai animasi ketika elemen terlihat
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');  // Tambah kelas animasi
                }
            });
        });
 
        // Observe setiap elemen section
        sectionContents.forEach(content => {
            observer.observe(content);
        });
    } else {
        console.warn("Tidak ada elemen dengan kelas '.section_content' ditemukan.");
    }
 });
// Fungsi untuk menampilkan galeri dengan animasi
window.onload = function() {
    const galeri = document.getElementById('galeri');
    setTimeout(() => {
        galeri.classList.add('show');
    }, 300); // Tunda sedikit agar animasi lebih halus
};

function submitForm() {
    // Sembunyikan form setelah submit
    document.getElementById('rsvpForm').style.display = 'none';
    return false; // Menghindari reload halaman
}

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    const offset = -currentSlide * 100; // 100% untuk 1 slide
    slides.style.transform = `translateX(${offset}%)`;
}

function changeSlide(n) {
    showSlide(currentSlide + n);
}

// Tampilkan slide pertama
showSlide(currentSlide);

document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-text');
        navigator.clipboard.writeText(textToCopy).then(function() {
            alert('Teks berhasil disalin: ' + textToCopy);
        }).catch(function(error) {
            console.error('Gagal menyalin teks:', error);
        });
    });
});
// Ambil elemen form dan daftar pesan
const pesanForm = document.getElementById('pesanForm');
const daftarPesan = document.getElementById('daftarPesan');

// Fungsi untuk menyimpan pesan ke localStorage
function simpanPesan(nama, ucapan, tanggal) {
    let pesanList = JSON.parse(localStorage.getItem('pesanList')) || []; // Ambil pesan dari localStorage, atau buat array baru jika tidak ada
    pesanList.push({ nama, ucapan, tanggal }); // Tambahkan pesan baru ke array
    localStorage.setItem('pesanList', JSON.stringify(pesanList)); // Simpan kembali ke localStorage
}

// Fungsi untuk menampilkan pesan dari localStorage ke halaman
function muatPesan() {
    const pesanList = JSON.parse(localStorage.getItem('pesanList')) || [];
    pesanList.forEach(pesan => {
        tampilkanPesan(pesan.nama, pesan.ucapan, pesan.tanggal); // Tampilkan setiap pesan yang ada
    });
}

// Fungsi untuk menampilkan pesan di halaman
function tampilkanPesan(nama, ucapan, tanggal) {
    const pesanItem = document.createElement('div');
    pesanItem.classList.add('pesan-item');
    pesanItem.innerHTML = `
        <h3>${nama}</h3>
        <p>${ucapan}</p>
        <p class="tanggal">Dikirim pada: ${tanggal}</p>
    `;
    daftarPesan.appendChild(pesanItem);
}

// Event listener untuk submit form
pesanForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah refresh halaman

    // Ambil nilai input
    const nama = document.getElementById('nama').value;
    const ucapan = document.getElementById('ucapan').value;
    const tanggal = new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Tampilkan pesan di halaman dan simpan di localStorage
    tampilkanPesan(nama, ucapan, tanggal);
    simpanPesan(nama, ucapan, tanggal);

    // Bersihkan form setelah submit
    pesanForm.reset();
});

// Muat pesan saat halaman di-refresh
window.addEventListener('load', muatPesan);

// Ketika pengguna menggulir halaman, jalankan fungsi showNavbar
window.onscroll = function() {
    showNavbar();
};



