const url = 'http://localhost:3000/'

const fetchAPI = async (url, option) => {
    const response = await fetch(url, option)
    return response.json();
}
const getDanhmuc = async () => {
    const urlDanhmuc = url + 'danhmuc'
    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetchAPI(urlDanhmuc, option)
    demSoluongDanhmuc(res)
}
const demSoluongDanhmuc = data => {
    demDanhmuc = data.length
    let danhmuc = document.getElementById('dm')
    danhmuc.innerText = demDanhmuc
}
const getSanpham = async () => {
    const urlSanpham = url + 'sanpham'
    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetchAPI(urlSanpham, option)
    demSoluongSanpham(res)
}
    const demSoluongSanpham = data => {
        demSanpham = data.length
        let sanpham = document.getElementById('sp')
        sanpham.innerText = demSanpham
    }
    const getHoadon = async () => {
        const urlHoadon = url + 'orders'
        const option = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await fetchAPI(urlHoadon, option)
        demSoluongHoadon(res)
    }
    const demSoluongHoadon = data => {
        demHoadon = data.length
        let hoadon = document.getElementById('hd')
        hoadon.innerText = demHoadon
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Danh mục', 'Sản phẩm', 'Đơn hàng'],
            datasets: [{
                label: '# of Votes',
                data: [4, 98, 7],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    getSanpham();
    getDanhmuc();
    getHoadon();


