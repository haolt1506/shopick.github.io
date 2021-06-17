const url = 'http://localhost:3000/'

const fetchAPI = async (url, option) => {
    const response = await fetch(url, option)
    return response.json();
}
const laydulieusanpham = data => {
    let target = document.getElementById('target')
    data.forEach((v, i) => {
        if (i <= 5) {
            target.innerHTML += `<div class="single-product new-colect">
       <div class="product-photo">
           <a href="">
               <img class="primary-photo" src="img/image/`+ v.image + `" style="height: 450px; object-fit: cover;" alt="" />
              
           </a>
           <div class="pro-action">
               <a href="#" class="action-btn"><i class="sp-heart"></i><span>Yêu thích</span></a>
               <a class="action-btn" onclick="themgiohang(`+ v.id + `)"><i
                       class="sp-shopping-cart"></i><span>Giỏ hàng</span></a>
               <a href="#" class="action-btn"><i class="sp-compare-alt"></i><span>So sánh</span></a>
           </div>
       </div>
       <div class="product-brief">
           <div class="pro-rating">
               <a href="#"><i class="sp-star rating-1"></i></a>
               <a href="#"><i class="sp-star rating-1"></i></a>
               <a href="#"><i class="sp-star rating-1"></i></a>
               <a href="#"><i class="sp-star rating-1"></i></a>
               <a href="#"><i class="sp-star rating-2"></i></a>
           </div>
           <h2 style="font-size: 12pt;"><a href="">
                   `+ v.name + `
               </a></h2>
           <h3>
               `+ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v.price) + `
           </h3>
       </div>
   </div>`
        }
    });
};
const laydulieudanhmuc = danhmuc => {
    let list = document.getElementById('listdm')
    danhmuc.forEach((v, i) => {
        list.innerHTML += `<li><a href="#">` + v.name + `</a></li>`

    });
};
const showProducts = async () => {
    const productURL = url + 'sanpham'
    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetchAPI(productURL, option)
    laydulieusanpham(res)
}
const showCat = async () => {
    const catURL = url + 'danhmuc'
    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetchAPI(catURL, option)
    laydulieudanhmuc(res)
}
const layidsanpham = async (id) => {
    const sanphamUrl = url + 'sanpham/' + id
    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return await fetchAPI(sanphamUrl, option)

}
let cart = [];
const themgiohang = async (id) => {
    let storage = localStorage.getItem('cart')
    if (storage) {
        cart = JSON.parse(storage)
    }
    let sanpham = await layidsanpham(id)

    let item = cart.find(f => f.sanpham.id == id)
    if (item) {
        item.quantity += 1
    } else {
        cart.push({ sanpham, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    showCart()

}
const showCart = () => {

    var cartBody = document.getElementById('cart-body')
    var total = document.getElementById('tongtien')
    let s = localStorage.getItem('cart')
    let giohang = JSON.parse(s)
    var totalprice = 0;
    cartBody.innerHTML = ''

    for (let index = 0; index < giohang.length; index++) {
        const item = giohang[index];
        tongtiensp = item.quantity * item.sanpham.price
        totalprice += tongtiensp
        cartBody.innerHTML += `<tr class="d-flex">
        <td class="product-thumbnail"><a href="#"><img src="img/image/`+ item.sanpham.image + `" alt="" /></a></td>
        <td class="product-name"><a href="#">${item.sanpham.name}</a></td>
        <td class="product-price"><span class="amount">`+ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.sanpham.price) + `</span></td>
        <td class="product-quantity text-center">

            ${item.quantity}

        </td>
        
        <td class="product-subtotal">`+ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tongtiensp) + `</td>
        <td class="product-remove"><button onclick="xoagiohang(`+ item.sanpham.id + `)" class="btn btn-danger">Xóa</button></td>
    </tr>`
        total.innerText = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalprice)

    }

}

const xoagiohang = id => {
    let s1 = localStorage.getItem('cart')
    if (s1) {
        cart = JSON.parse(s1)
    }
    cart = cart.filter(item => item.sanpham.id != id)
    localStorage.setItem('cart', JSON.stringify(cart))
    showCart()
}
const xoagiohangall = () => {
    let s1 = localStorage.getItem('cart')
    if (s1) {
        cart = JSON.parse(s1)
    }
    localStorage.removeItem('cart')
    showCart()
}

const thanhtoan = async () => {
    const data = {
        hoten: document.getElementById('hoten').value,
        email: document.getElementById('email').value,
        diachi: document.getElementById('diachi').value,
        ghichu: document.getElementById('ghichu').value
    }
    if (data.hoten == '' || data.email == '' || data.diachi == '' || data.ghichu == '') {
        alert('Bạn vui lòng nhập đủ dữ liệu');
    } else {
        const urlOrders = url + 'orders'
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const res = await fetchAPI(urlOrders, option)
        await chitietthanhtoan(res.id)
    }
}
const chitietthanhtoan = async (orderId) => {
    let s1 = localStorage.getItem('cart')

    let data = JSON.parse(s1)

    let orderDetails = []
    for (let index = 0; index < data.length; index++) {
        const item = data[index];
        let orderDetail = {
            order_id: orderId,
            product_id: item.sanpham.id,
            quantity: item.quantity,
            unit_price: item.sanpham.price
        }
        orderDetails.push(orderDetail)
    }
    let promises = orderDetails.map(item => {
        return postchitietthanhtoan(item)
    })
    console.log(orderDetails)
    await Promise.all(promises)
    cart = []
    localStorage.removeItem('cart')
    showCart()
}
const postchitietthanhtoan = async (data) => {
    const urlOrders = url + 'order_details'
    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    }
    await fetchAPI(urlOrders, option)
}
showCat();
showProducts();
showCart();
