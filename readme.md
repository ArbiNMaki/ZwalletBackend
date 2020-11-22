<h1>Zwallet Backend</h1>
<br>
<h2> Node JS</h2>
<p>
	Node JS merupakan perangkat lunak yang didesain untuk mengembangkan aplikasi berbasis web dan ditulis dalam sintaks bahasa pemrograman JavaScript.
	<br>
	<h5>Apa bedanya dengan javascript?</h5>
	Secara umum, bahasa pemograman yang digunakan pada JavaScript dan Node.js sama. Hanya saja, Node.js memiliki kumpulan API yang berbeda antara API yang satu dengan API yang lainnya.
	node js sendiri berfungsi untuk menjalankan kode javascript disisi server dengan konsep non-blocking.
	<h5>Lalu Non-blocking itu apa sih??</h5>
	Misalnya begini, ada dua proses yang berjalan yaitu proses A dan proses B. Sayangnya proses A mengalami blocking karena suatu hal. Meskipun demikian, Anda masih tetap bisa menjalankan proses B jika proses ini tidak membutuhkan output dari proses A.
	node js dibekali dengan engine v8 dari google yg bisa mengeksekusi kode dengan cepat.
	<br>
	untuk documentasinya atau cara install kalian bisa langsung pergi <a href="https://nodejs.org/en/">https://nodejs.org/en/</a>
</p>

<br>
<h2> EXPRESS JS</h2>
<p>
	exprees js merupakan sebuah framework yang memiliki fitur routing, rendering view dan mendukung middleware.. ya kurang lebih seperti MVC, model view controller..
	<br><br>
	express js biasanya berfungsi untuk mengembangkan berbagai produk seperti aplikasi web ataupun RESTful API.
	<br><br>
	kalian bisa langsung mengunjungi situs <a href="https://idjs.github.io/belajar-nodejs/expressjs/index.html">https://idjs.github.io/belajar-nodejs/expressjs/index.html</a>
	<br><br>
	atau ke situs resmi di <a href="https://expressjs.com/">https://expressjs.com/</a>
</p>

<br>
<h2>RESTful API</h2>
<p>
	API. (Application Programming Interface) adalah kumpulan aturan yang memungkinkan dua atau lebih program untuk berkomunikasi satu sama lain. API dibuat di server untuk kemudian dapat memungkinkan client untuk dapat berkomunikasi dengannya.
	<br><br>
	REST. (Representational State Transfer) adalah jenis dari API atau yang menggambarkan bentuk dari API itu seperti apa. REST adalah kumpulan aturan yang diikuti oleh developer untuk membuat API
	<br><br>
	RESTful API merupakani jembatan antara database dengan client. Sehingga, client dapat berkomunikasi dengan server, mengambil dan memanipulasi data yang ada di database sesuai dengan aturan - aturan yang sudah diberikan tanpa memungkinkan mereka untuk dapat merusak / merubah sesuatu di luar aturan yang berlaku.
	<br><br>
	Ada dua hal yang sangat penting untuk kamu ketahui sebelum mengenal lebih dalam tentang apa itu RESTful API. Yaitu, Request dan Response.
	<br><br>
	Setiap URL yang ada pada RESTful API disebut dengan Request. Sedangkan Response adalah data yang dikembalikan setelah client melakukan Request.
	<br><br>
	kalian bisa kunjungi situs <a href="https://www.galihlprakoso.com/2019/04/apa-itu-rest-ful-api-pengertian-penjelasan.html">https://www.galihlprakoso.com/2019/04/apa-itu-rest-ful-api-pengertian-penjelasan.html</a> untuk lebih lengkapnya
</p>

<br>
<h2>MySQL</h2>
<p>
	MySQL adalah sebuah database management system (manajemen basis data) menggunakan perintah dasar SQL (Structured Query Language). MySQL masuk ke dalam jenis RDBMS (Relational Database Management System). Maka dari itu, istilah semacam baris, kolom, tabel, dipakai pada MySQL. Contohnya di dalam MySQL sebuah database terdapat satu atau beberapa tabel.
	<br><br>
	SQL sendiri merupakan suatu bahasa yang dipakai di dalam pengambilan data pada relational database atau database yang terstruktur. Jadi MySQL adalah database management system yang menggunakan bahasa SQL sebagai bahasa penghubung antara perangkat lunak aplikasi dengan database server.
	<br><br>
	untuk referensi yg saya dapat <a href="https://www.niagahoster.co.id/blog/mysql-adalah/">https://www.niagahoster.co.id/blog/mysql-adalah/</a>
</p>
<br>
<br>
<span>Folder HTML to test Cors</span>
<br>
flowchart <a href="https://app.diagrams.net/#G152gxRVmuTOI5Onf2aXVx6Wg5YjAxezb1">https://app.diagrams.net/#G152gxRVmuTOI5Onf2aXVx6Wg5YjAxezb1</a>
<br>
<h3>USERS</h3>
set on your postman
<p>
	method GET<a href="http://localhost:8080/users/"> http://localhost:8080/users/ </a>for view all list users<br>
	method POST<a href="http://localhost:8080/users/"> http://localhost:8080/users/ </a>for insert data on table users<br>
	method GET<a href="http://localhost:8080/users?page=1&limit=10"> http://localhost:8080/users?page=1&limit=10 </a> example for url pagination<br>
	method GET<a href="http://localhost:8080/users?search=fendi"> http://localhost:8080/users?search=fendi </a>for search users<br>
	method GET<a href="http://localhost:8080/users/1"> http://localhost:8080/users/1 </a>select data users<br>
	method DELETE<a href="http://localhost:8080/users/5 "> http://localhost:8080/users/5 </a> example for delete users with id<br>
	method PATCH<a href="http://localhost:8080/users/5 "> http://localhost:8080/users/5 </a> example for edit users with id<br>
</p>