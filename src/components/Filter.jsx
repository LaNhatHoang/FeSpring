import {GrFilter, GrRefresh} from 'react-icons/gr'

const Filter = (props) => {
    const { filter, setFilter } = props
    return (
        <div className='Filter'>
            <div style={{width: '200px'}} className="d-none d-lg-block bg-white mt-5 ms-5 rounded-1">
                <div className="header d-flex justify-content-between p-3 ">
                    <div className='d-flex align-items-center fs-6'>
                        <GrFilter/>
                        <p className='m-0 ms-1'>Filter</p>
                    </div>
                    <div>
                        <GrRefresh/>
                    </div>
                </div>
                <div className='filter px-3'>
                    <div className='py-3 border-top border-bottom'>
                        <div className='pb-2'>Danh muc san pham</div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Comedy</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Comedy</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Comedy</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Comedy</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Comedy</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Comedy</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Comedy</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Comedy</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Comedy</label>
                        </div>
                        <div className='py-1 d-flex align-items-center'>
                            <input type="checkbox" name="" id="" />
                            <label className='fs-6 ms-1'>Comedy</label>
                        </div>
                    </div>
                    <div>
                        <div className='p-4'>Khoang gia</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter