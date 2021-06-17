const url = 'http://localhost:3000/'

const fetchAPI = async (url, option) => {
    const response = await fetch(url, option)
    return response.json();
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
    showHoadon(res)
}
const showHoadon = data => {
    let ordersList = document.getElementById('list_hoadon');
    ordersList.innerHTML = '';
    data.forEach((v, i) => {
        ordersList.innerHTML += `<div class="mail-item card">
        <table class="mail-container">
          <tr>
            <td class="mail-left">

            </td>
            <td class="mail-center">
              <div class="mail-item-header">
                <h4 class="mail-item-title"><a href="orders-detail.html" class="title-color">Hóa đơn ${v.id}</a></h4>
                <a href="orders-detail.html"><span class="label label-success text-warning">Đang chờ duyệt</span></a>
              </div>
              <p class="mail-item-excerpt">Khách hàng: ${v.hoten} <br>Địa chỉ: ${v.diachi} <br> Email: ${v.email}</p>
            </td>
            <td class="mail-right">
              <button type="submit" class="btn btn-danger" onclick="alerT(${v.id})"><i class="fa fa-trash"></i></button>
              
            </td>
          </tr>
        </table>
      </div><!-- END mail-item -->`
    });
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
                removeHoadon(id)
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Đã hủy bỏ',
                'Sản phẩm của bạn được giữ nguyên :)',
                'error',
            )
        }
    })
}
const removeHoadon = async (id) => {
    const urlHoadon = url + 'orders/' + id
    const option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    await fetchAPI(urlHoadon, option)
    getHoadon()
}
getHoadon();