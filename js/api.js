/* ৭. একদম প্রাথমিক স্টেপ হিসেবে jsonplaceholder এর ওয়েবসাইট থেকে ডাটা fetch করে সেটাকে কনসোল এ দেখাতে হবে। ধরো তুমি তাদের ওয়েবসাইট এ photos এর API এর লিংক কোনটা সেটা জাভাস্ক্রিপ্ট দিয়ে কোড করে সেই ডাটা কনসোল এ দেখতে পারতেছো কিনা। তারপর কয়েকটা কার্ড বানাবে (হতে পারে বুটস্ট্রাপ এর কার্ড) সেগুলা আবার তুমি html দিয়ে ওয়েবসাইট এ ছবি এবং ছবির নিচে ছবির টাইটেল দেখাবে।

৮. প্রত্যেকটা ফটোতে ক্লিক করলে উপরে আরেকটা div থাকবে। ক্লিক করার পর ডাইনামিকভাবে ওই ফটো এর ডাটা লোড করবে। সেটা করার জন্য আগের ডাটা লোড করার API এর লিংক এর পরে photos এর পরে ডাইনামিকভাবে /{id} বসিয়ে দিবে। এরপর ডিটেইল অংশে photo এর url দিয়ে মেইন ইমেজ এবং thumbnail ইমেজ দুইটাই দেখাবে। সাথে সাথে title প্রপার্টিও দেখাবে।

৯. তুমি যে ডাটা লোড করেছো। বা ডাটা ওয়েবসাইট এ দেখাচ্ছ। সেই কোড এর মধ্যে arrow ফাংশন ইউজ করতে পারতেছো কিনা। যখন লুপ চালাচ্ছ সেখানে forEach ইউজ করতে পারতেছো কিনা।
১০. সিরিয়াস প্রাকটিস

হয় মডিউল ৩৩ ভালো করে দেখে ফেলো। বিশেষ করে the meal db রিলেটেড ৩৩-৫ থেকে ৩৩-৮ পর্যন্ত। তারপরে আরো সময় থাকলে এর আরেকটা খালতো ভাই the coktaildb থেকে কিছু জিনিস এনে দেখাবে। একজাক্টলি কি দেখাতে হবে। সেটা আমি বলে দিবো না। তুমি ওদের ওয়েবসাইট এ যাও। সেখানে কি কি লেখা আছে সেগুলা পড়ো। api গুলা এর ছোট করে কি কি করে বলা আছে। সেগুলা দেখো। তারপর কিছু ডাটা লোড করো। সেই ডাটাগুলো দেখাও। এইখানে সার্চ ফাংশনালিটি ইমপ্লিমেন্ট করো। অনেকটা mealdb এর মতো। আবার কোন একটাতে ক্লিক করলে সেটার ডিটেল দেখাবে। */

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const countryContainer = document.getElementById('country-container')
const error = document.getElementById('error');
const countryDetails = document.getElementById('country-details')
searchBtn.addEventListener('click', function () {

    const search = searchInput.value;
    //error
    if (search === '') {
        error.innerText = 'Search field cannot be empty';
        return;
    }
    //clear
    countryDetails.textContent = ''
    countryContainer.textContent = '';

    const url = `https://restcountries.eu/rest/v2/name/${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data))
});
function showData(data) {
    if (data.status == 404) {
        error.innerText = 'NO Result Found'
    } else {
        error.innerText = '';
    }
    //array type [{},{},{},{}];

    data.forEach(item => {
        console.log(item.flag);
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
       <div class="rounded overflow-hidden border p-2">
            <img src="${item.flag}" class="w-100" alt="" />
        </div>

        <div class="
      py-2
      d-flex
      justify-content-between
      align-items-center
      d-md-block
      text-md-center
    ">
            <h1>${item.name}</h1>
            <button onclick="showDetails('${item.alpha3Code}')" class="btn btn-dark">Learn More</button>
        </div>`
        countryContainer.appendChild(div)
    })
}
function showDetails(alpha3Code) {
    fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`)
        .then(res => res.json())
        .then(data => {
            countryDetails.innerHTML = `
            <div class="col-md-12">
            <h1>${data.name}</h1>
            <p>Capital:${data.capital}</p>
            <p>Currency Name:${data.currencies[0].name} </p>
            <p>Currency Symbol: ${data.currencies[0].symbol}</p>
        </div>
            `
        })
}




