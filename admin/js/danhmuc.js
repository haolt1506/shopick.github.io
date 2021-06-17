const url = 'http://localhost:3000/'

const fetchAPI = async (url, option) => {
    const response = await fetch(url, option)
    return response.json();
}
const getDanhmucById = async (id) => {
    const urlDanhmuc = url + 'danhmuc/' + id
    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return await fetchAPI(urlDanhmuc, option)
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

const showDanhmuc = data => {
    let contactList = document.getElementById('contacts-list');
    contactList.innerHTML = '';
    data.forEach((v, i) => {
        contactList.innerHTML += `<div class="col-sm-6">
    <div class="card user-card contact-item p-md">
        <div class="media">
            
            <div class="media-body">
                <h5 class="media-heading title-color">${v.name}</h5>
                <small class="media-meta">Số thứ tự: ${v.id}</small> <br>
                
            </div>
        </div>
        <div class="contact-item-actions">
            <a href="javascript:void(0)" onclick="showEditDanhmuc(${v.id})" class="btn btn-success" data-toggle="modal"
                data-target="#contactModal"><i class="fa fa-edit"></i></a>
            <a href="javascript:void(0)" class="btn btn-danger" onclick="alerT(${v.id})" data-toggle="modal"
                data-target="#deleteItemModal"><i class="fa fa-trash"></i></a>
        </div><!-- .contact-item-actions -->
    </div><!-- card user-card -->
</div>`
    });
}

const addDanhmuc = async () => {
    const data = {
        name: document.getElementById('contactName').value
    }
    if (data.name == '') {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Tên danh mục không được để trống'
        })
        clearForm();
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thêm danh mục thành công',
            showConfirmButton: false,
            timer: 1500
        })
        const urlDanhmuc = url + 'danhmuc'
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const res = await fetchAPI(urlDanhmuc, option)
        showAddedDanhmuc(res)
    }
}
const showAddedDanhmuc = danhmuc => {
    let contactList = document.getElementById('contacts-list');
    contactList.innerHTML += `<div class="col-sm-6">
    <div class="card user-card contact-item p-md">
        <div class="media">
            
            <div class="media-body">
                <h5 class="media-heading title-color">${danhmuc.name}</h5>
                <small class="media-meta">Số thứ tự: ${danhmuc.id}</small> <br>
                
            </div>
        </div>
        <div class="contact-item-actions">
            <a href="javascript:void(0)" onclick="showEditDanhmuc(${danhmuc.id})" class="btn btn-success" data-toggle="modal"
                data-target="#contactModal"><i class="fa fa-edit"></i></a>
            <a href="javascript:void(0)" class="btn btn-danger" onclick="alerT(${danhmuc.id})" data-toggle="modal"
                data-target="#deleteItemModal"><i class="fa fa-trash"></i></a>
        </div><!-- .contact-item-actions -->
    </div><!-- card user-card -->
</div>`
}
const submitForm = async () => {
    let id = document.getElementById('idedit').value
    await editDanhmuc(id)
}
const editDanhmuc = async (id) => {
    const data = {
        name: document.getElementById('contactName2').value,
    }
    if (data.name == '') {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Tên danh mục không được để trống'
        })
        clearForm();
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sửa danh mục thành công',
            showConfirmButton: false,
            timer: 1500
        })
        const urlProducts = url + 'danhmuc/' + id
        const option = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        await fetchAPI(urlProducts, option)
        getDanhmuc()
    }
}
const showEditDanhmuc = async (id) => {
    const danhmuc = await getDanhmucById(id)
    document.getElementById('contactName2').value = danhmuc.name
    document.getElementById('idedit').value = danhmuc.id
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
                removeDanhmuc(id)
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
const removeDanhmuc = async (id) => {
    const urlDanhmuc = url + 'danhmuc/' + id
    const option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    await fetchAPI(urlDanhmuc, option)
    getDanhmuc()
}
getDanhmuc();