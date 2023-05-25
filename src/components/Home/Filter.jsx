import {GrFilter, GrRefresh} from 'react-icons/gr'

const Filter = (props) => {
    const { filter, setFilter } = props
    return (
        <div className='Filter'>
            <div style={{width: '200px'}} className="d-none d-lg-block mt-5 ms-5 rounded-1">
                <div className='pt-2'>
                <div className="header bg-white d-flex justify-content-between p-3 ">
                    <div className='d-flex align-items-center fs-6'>
                        <GrFilter/>
                        <p className='m-0 ms-1'>Bộ lọc</p>
                    </div>
                    <div>
                        <GrRefresh/>
                    </div>
                </div>
                <div className='filter px-3 bg-white'>
                    <div className='py-3 border-top border-bottom'>
                        <div className='pb-2'>Danh mục sản phẩm</div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Thiếu nhi</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Văn học</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Khoa Học</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Công nghệ</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Kinh tế</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Đời sống</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Ngoại ngữ</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Y học</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Du lịch</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Pháp luật</label>
                        </div>
                    </div>
                    <div>
                        <div className='py-3 d-flex justify-content-center'>
                            <button className='px-3 py-1 border-0 rounded-2 bg-dark-subtle'>Lọc</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Filter