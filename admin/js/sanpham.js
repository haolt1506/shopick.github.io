function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();

            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

const url = 'http://localhost:3000/'

const fetchAPI = async (url, option) => {
    const response = await fetch(url, option)
    return response.json();
}
const getSanphamById = async (id) => {
    const urlSanpham = url + 'sanpham/' + id
    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return await fetchAPI(urlSanpham, option)
}
const getDanhmucId = async (id) => {
    const urlDanhmuc = url + 'danhmuc/' + id
    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    res = await fetchAPI(urlDanhmuc, option)
    return res
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
    showDanhmuc(res)
}
const getDanhmucEdit = async () => {
    const urlDanhmuc = url + 'danhmuc'
    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const res = await fetchAPI(urlDanhmuc, option)
    showDanhmucEdit(res)
}
const showDanhmuc = data => {
    let danhmuc = document.getElementById('dm');
    data.forEach((v, i) => {
        danhmuc.innerHTML += `<option value="${v.id}">${v.name}</option>`
    });
}
const showDanhmucEdit = data => {
    let danhmuc = document.getElementById('editdm')
    data.forEach(async (v, i) => {
        tendm = await getDanhmucId(v.id)
        if (v.id == tendm.id) {
            danhmuc.innerHTML += `<option selected value="${tendm.id}">${tendm.name}</option>`
        } else {
            danhmuc.innerHTML += `<option value="${tendm.id}">${tendm.name}</option>`
        }

    });
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
    showSanpham(res)
}
const showSanpham = data => {
    let contactList = document.getElementById('contacts-list2');
    contactList.innerHTML = '';

    data.forEach(async (v, i) => {
        tendm = await getDanhmucId(v.id_cat)
        contactList.innerHTML += `<div class="col-sm-6">
        <div class="card user-card contact-item p-md">
            <div class="media">
                <div class="media-left">
                    <div class="avatar avatar-xl avatar-circle">
                        <img src="img/image/${v.image}"  style="height: 200px" alt="contact image">
                    </div>
                </div>
                <div class="media-body">
                    <h5 class="media-heading title-color">${v.name}</h5>
                    <div class="row">
                        <div class="col-5">
                            <small class="media-meta">Giá: <del>`+ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v.price) + `</del></small> <br>
    
                        <small class="media-meta">Số lượng tồn kho: <span> ${v.soluongtonkho}</span> </small>
                        </div>
                        <div class="col-7"> 
                            <small class="media-meta">Giá khuyến mãi: `+ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v.price_promo) + `</small> <br>
                            <small class="media-meta">Loại sản phẩm: <span
                                >`+ tendm.name + `</span> </small> <br>
                                <small class="media-meta">Thời điểm nhập hàng: <span
                                    >${v.ngaynhaphang}</span> </small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contact-item-actions">
                <a href="javascript:void(0)" onclick="showEditSanpham(${v.id})" class="btn btn-success" data-toggle="modal"
                    data-target="#contactModal"><i class="fa fa-edit"></i></a>
                <a href="javascript:void(0)" onclick="alerT(${v.id})" class="btn btn-danger" data-toggle="modal"
                    data-target="#deleteItemModal"><i class="fa fa-trash"></i></a>
            </div><!-- .contact-item-actions -->
        </div><!-- card user-card -->
    </div><!-- END column -->`
    });
}

const addSanpham = async () => {
    const data = {
        name: document.getElementById('tendt').value,
        image: document.getElementById('urlHinh').value.replace(/.*(\/|\\)/, ''),
        price: document.getElementById('gia').value,
        price_promo: document.getElementById('giakm').value,
        ngaynhaphang: document.getElementById('timenhaphang').value,
        soluongtonkho: document.getElementById('soluongtonkho').value,
        id_cat: document.getElementById('dm').value
    }
    if (data.name == "" || data.name.length <= 4) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Tên sản phẩm không được nhỏ hơn 4 kí tự'
        })
        clearForm();
    } else if (data.image == '') {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Bạn chưa chọn hình'
        })
        clearForm();
    } else if (data.price == '') {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Vui lòng nhập giá cho sản phẩm'
        })
        clearForm();
    } else if (data.price < 0) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Giá không được nhỏ hơn 0'
        })
        clearForm();
    } else if (data.ngaynhaphang == '') {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Vui lòng nhập thời điểm nhập hàng'
        })
        clearForm();
    } else if (data.soluongtonkho == '') {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Vui lòng nhập số lượng tồn kho'
        })
        clearForm();
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thêm sản phẩm thành công',
            showConfirmButton: false,
            timer: 1500
        })
        const urlSanpham = url + 'sanpham'
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const res = await fetchAPI(urlSanpham, option)
        showAddedSanpham(res)
    }

}

const clearForm = () => {
    document.getElementById('tendt').value = ''
    document.getElementById('gia').value = ''
    document.getElementById('giakm').value = ''
    document.getElementById('timenhaphang').value = ''
    document.getElementById('soluongtonkho').value = ''
}
const showAddedSanpham = async sanpham => {
    let contactList = document.getElementById('contacts-list2');
    tendm = await getDanhmucId(sanpham.id)
    contactList.innerHTML += `<div class="col-sm-6">
    <div class="card user-card contact-item p-md">
        <div class="media">
            <div class="media-left">
                <div class="avatar avatar-xl avatar-circle">
                    <img src="img/image/${sanpham.image}" alt="contact image">
                </div>
            </div>
            <div class="media-body">
                <h5 class="media-heading title-color">${sanpham.name}</h5>
                <div class="row">
                    <div class="col-5">
                        <small class="media-meta">Giá: <del>`+ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sanpham.price) + `</del></small> <br>

                    <small class="media-meta">Số lượng tồn kho: <span> ${sanpham.soluongtonkho}</span> </small>
                    </div>
                    <div class="col-7"> 
                        <small class="media-meta">Giá khuyến mãi: `+ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sanpham.price_promo) + `</small> <br>
                        <small class="media-meta">Loại sản phẩm: <span
                            >`+ tendm.name + `</span> </small> <br>
                            <small class="media-meta">Thời điểm nhập hàng: <span
                                >${sanpham.ngaynhaphang}</span> </small>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact-item-actions">
            <a href="javascript:void(0)" onclick="showEditSanpham(${sanpham.id})" class="btn btn-success" data-toggle="modal"
                data-target="#contactModal"><i class="fa fa-edit"></i></a>
            <a href="javascript:void(0)" onclick="removeSanpham(${sanpham.id})" class="btn btn-danger" data-toggle="modal"
                data-target="#deleteItemModal"><i class="fa fa-trash"></i></a>
        </div><!-- .contact-item-actions -->
    </div><!-- card user-card -->
</div><!-- END column -->`
}
const submitForm = async () => {
    let id = document.getElementById('editid').value
    await editSanpham(id)
}
const editSanpham = async (id) => {
    const data = {
        name: document.getElementById('edittendt').value,
        image: document.getElementById('editurlHinh').value.replace(/.*(\/|\\)/, ''),
        price: document.getElementById('editgia').value,
        price_promo: document.getElementById('editgiakm').value,
        ngaynhaphang: document.getElementById('edittimenhaphang').value,
        soluongtonkho: document.getElementById('editsoluongtonkho').value,
        id_cat: document.getElementById('editdm').value
    }
    if (data.name == "" || data.name.length <= 4) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Tên sản phẩm không được nhỏ hơn 4 kí tự'
        })
        clearForm();
    } else if (data.image == '') {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Bạn chưa chọn hình'
        })
        clearForm();
    } else if (data.price == '') {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Vui lòng nhập giá cho sản phẩm'
        })
        clearForm();
    } else if (data.price < 0) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Giá không được nhỏ hơn 0'
        })
        clearForm();
    } else if (data.ngaynhaphang == '') {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Vui lòng nhập thời điểm nhập hàng'
        })
        clearForm();
    } else if (data.soluongtonkho == '') {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Vui lòng nhập số lượng tồn kho'
        })
        clearForm();
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sửa sản phẩm thành công',
            showConfirmButton: false,
            timer: 1500
        })
        const urlProducts = url + 'sanpham/' + id
        const option = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        await fetchAPI(urlProducts, option)
        getSanpham()
    }
}
const showEditSanpham = async (id) => {
    const Sanpham = await getSanphamById(id)
    document.getElementById('edittendt').value = Sanpham.name
    document.getElementById('editgia').value = Sanpham.price
    document.getElementById('editgiakm').value = Sanpham.price_promo
    document.getElementById('editdm').value = Sanpham.id_cat
    document.getElementById('edittimenhaphang').innerText = Sanpham.ngaynhaphang
    document.getElementById('editsoluongtonkho').value = Sanpham.soluongtonkho
    document.getElementById('editUrlHinh').innerHTML = `<img src="img/image/${Sanpham.image}" alt="">`
    document.getElementById('editid').value = Sanpham.id
}
function alerT(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Bạn có chắc không?',
        text: "Bạn sẽ không thể khôi phục lại điều này!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có, hãy xóa nó!',
        cancelButtonText: 'Không, hủy bỏ!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Đã xóa!',
                'Sản phẩm của bạn đã được xóa.',
                'success',
                removeSanpham(id)
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Đã hủy bỏ',
                'Sản phẩm của bạn được giữ nguyên :)',
                'error'
            )
        }
    })
}
const removeSanpham = async (id) => {
    const urlSanpham = url + 'sanpham/' + id
    const option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    await fetchAPI(urlSanpham, option)
    getSanpham()
}
getDanhmuc();
getDanhmucEdit();
getSanpham();