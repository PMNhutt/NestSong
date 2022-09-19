import { useEffect } from 'react'
import styles, { layout } from '../../share/style'
import { Banner } from '../../share/components'
import { bannerAbout, about1, about2 } from '../../assets/images'
import { motion } from 'framer-motion'
import { BsPatchCheck } from 'react-icons/bs'

const About = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title])

  return (
    <div>
      <div className="text-black font-maven">
        <Banner img={bannerAbout} />
        <div className={`${styles.paddingX} ${layout.section} gap-[5%] items-center`}>
          <motion.div
            initial={{ opacity: 0, x: '-2vw' }}
            whileInView={{
              opacity: 1, x: 0, transition: {
                duration: 0.8
              }
            }}
            viewport={{ once: true, amount: 0.5 }}
            className='flex-1'>
            <h1 className='text-[30px] font-semibold'>Yến Sào Nesty</h1>
            <p className='leading-[28px] my-6'>
              YẾN SÀO NESTY luôn cố gắng trở thành một thương hiệu Yến Sào hàng đầu Việt Nam về uy tín và chất lượng để phục vụ
              được người tiêu dùng, mang đến sự hài lòng và an tâm khi khách hàng lựa chọn. Với sứ mệnh luôn đồng hành và thấu hiểu
              tâm ý của khách hàng: không chỉ là giá thành sản phẩm trung thực mà còn là sự nhiệt tình, toàn tâm khi tư vấn. NESTY luôn muốn đảm bảo chất lượng và sự hiệu quả của từng sản phẩm mang đến khách hàng càng tốt hơn,
              và quan trọng trên hết chính là xứng đáng với niềm tin tưởng của khách hàng đã dành cho NESTY suốt thời gian qua.
            </p>
            <p className='leading-[28px]'>
              Để có được sản phẩm Yến sào chất lượng và hiệu quả cao nhất cho khách hàng, Nesty chọn Khánh Hòa là nơi để thu hoạch tổ yến.
              Sau khi các tổ đủ tuổi, đủ tiêu chuẩn được hái xuống thì sẽ được các nhân viên đầy kinh nghiệm của Nesty xử lý và kết hợp cùng
              công nghệ mới để mang đến sản phẩm hài lòng nhất. Điểm đặc biệt làm cho Nesty được mọi khách hàng ưa thích và chỉ có duy nhất ở
              Nesty là khách hàng không còn phải đau đầu chọn lựa và lo lắng về chất lượng, hiệu quả hay mẫu mã của sản phẩm nữa mà vẫn có giá
              thành luôn tốt nhất, chất lượng tốt nhất.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: '2vw' }}
            whileInView={{
              opacity: 1, x: 0, transition: {
                duration: 0.8
              }
            }}
            viewport={{ once: true, amount: 0.5 }}
            className='sm:w-[682px] w-full h-[496px] bg-contain bg-no-repeat' style={{ backgroundImage: `url(${about1})` }} />
        </div>

        <div className={`${styles.paddingX} flex md:flex-row-reverse flex-col gap-20 mb-20 items-center`}>
          <motion.div
            initial={{ opacity: 0, x: '2vw' }}
            whileInView={{
              opacity: 1, x: 0, transition: {
                duration: 0.8
              }
            }}
            viewport={{ once: true, amount: 0.5 }}
            className='flex-1'>
            <h1 className='text-[30px] font-semibold'>Tại sao nên chọn Nesty?</h1>
            <p className='leading-[28px] my-6'>
              Những dòng sản phẩm chính mà Nesty đưa ra thị trường khẳng định chất lượng bằng những kiểm tra khắc khe nhất. Bên cạnh đó với nỗ lực không ngừng nghỉ,
              từ những sản phẩm tuyệt vời chúng tôi tạo ra những sản phẩm giúp khách hàng hoàn toàn tự tin khi tặng cho người thân, bạn bè, đối tác hoặc VIP.
            </p>
            <ul>
              <li className='flex items-center gap-3 py-2'>
                <BsPatchCheck className='text-[20px]' />
                <p>Chọn nguyên liệu yến theo tỉ lệ nghiêm ngặt đảm bảo tiêu chuẩn tốt nhất.</p>
              </li>
              <li className='flex items-center gap-3 py-2'>
                <BsPatchCheck className='text-[20px]' />
                <p>Chế biến bởi bàn tay chuyên nghiệp của nghệ nhân Yến sào.</p>
              </li>
              <li className='flex items-center gap-3 py-2'>
                <BsPatchCheck className='text-[20px]' />
                <p>Bảo quản theo tiêu chuẩn cao.</p>
              </li>
              <li className='flex items-center gap-3 py-2'>
                <BsPatchCheck className='text-[20px]' />
                <p>Hưởng ưu đãi tuyệt vời duy nhất tại Nesty</p>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: '-2vw' }}
            whileInView={{
              opacity: 1, x: 0, transition: {
                duration: 0.8
              }
            }}
            viewport={{ once: true, amount: 0.5 }}
            className='sm:w-[400px] w-full h-[400px] bg-contain bg-no-repeat' style={{ backgroundImage: `url(${about2})` }} />
        </div>

      </div>
    </div>
  )
}

export default About