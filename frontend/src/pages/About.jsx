import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">About Planify</h1>
        <p className="hero-subtitle">
          Turning learning intentions into real achievements — one plan at a time.
        </p>
      </section>

      {/* Our Story */}
      <section className="section story">
        <div className="about-container">
          <div className="grid two-columns reverse-on-mobile">
            <div className="story-text">
              <h2 className="section-title">Our Story</h2>
              <p>
                Planify ra đời từ một vấn đề rất quen thuộc với bất kỳ ai từng tự học: lập kế hoạch thì dễ, nhưng duy trì và hoàn thành nó lại khó vô cùng.
              </p>
              <p>
                Là những sinh viên, chúng tôi đã trải qua rất nhiều lần hào hứng đặt mục tiêu học tập lớn lao vào đầu kỳ — rồi dần dần bỏ cuộc vì thiếu theo dõi, nhắc nhở và động lực bền vững. Chúng tôi nhận ra rằng tự học trong thời đại kiến thức thay đổi chóng mặt không chỉ cần ý chí, mà còn cần một hệ thống thông minh, sự nhắc nhở nhẹ nhàng và một cộng đồng cùng đồng hành.
              </p>
              <p>
                Vì vậy chúng tôi tạo ra <strong>Planify</strong> — sự kết hợp giữa "Plan" (lập kế hoạch) và "Simplify" (đơn giản hóa).
              </p>
              <p className="mt-4">
                <em>Dù chỉ là một group project nhỏ của sinh viên, chúng tôi hy vọng Planify sẽ giúp ích được cho nhiều bạn trẻ đang cố gắng tự học mỗi ngày.</em>
              </p>
            </div>
            {/* Bỏ phần ảnh, thay bằng không gian trống hoặc bạn có thể thêm icon/emoji lớn nếu muốn */}
            <div className="story-placeholder text-center">
              <div className="placeholder-emoji">📚✨</div>
              <p className="placeholder-text">A tool built with passion by students, for students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section cards bg-light">
        <div className="about-container">
          <div className="grid three-columns">
            <div className="card text-center">
              <div className="card-icon">🎯</div>
              <h3 className="card-title">Our Mission</h3>
              <p className="card-text">
                Giúp người tự học trên khắp thế giới lập kế hoạch học tập đơn giản, bền vững và có tính cộng đồng.
              </p>
            </div>
            <div className="card text-center">
              <div className="card-icon">🌟</div>
              <h3 className="card-title">Our Vision</h3>
              <p className="card-text">
                Một thế giới mà ai cũng có thể đạt được mục tiêu học tập của mình một cách tự tin và thích thú.
              </p>
            </div>
            <div className="card text-center">
              <div className="card-icon">💡</div>
              <h3 className="card-title">Core Values</h3>
              <p className="card-text">
                Simplicity • Accountability • Community • Continuous Improvement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features">
        <div className="about-container">
          <h2 className="section-title text-center">What Makes Planify Special</h2>
          <div className="grid two-columns">
            <div className="feature-item">
              <strong>📅 Flexible Planning:</strong> Xây dựng kế hoạch chi tiết với giai đoạn, nhiệm vụ và công việc nhỏ
            </div>
            <div className="feature-item">
              <strong>🔔 Smart Reminders:</strong> Thông báo hàng ngày giúp bạn không quên tiến độ
            </div>
            <div className="feature-item">
              <strong>📊 Honest Analytics:</strong> Báo cáo hiệu suất trung thực theo ngày, tuần và tổng thể
            </div>
            <div className="feature-item">
              <strong>🌍 Community Sharing:</strong> Khám phá, thích và áp dụng những kế hoạch đã thành công từ người khác
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="section cta text-center bg-light">
        <div className="about-container">
          <p className="lead">
            Planify được phát triển bởi một nhóm sinh viên đam mê trong khuôn khổ <strong>Group Project B3</strong>.<br />
            Công nghệ sử dụng: React.js, Spring Boot, MySQL và quy trình Agile.
          </p>
          <p className="mt-4 lead">
            Đây là dự án học tập của chúng tôi — cảm ơn bạn đã trải nghiệm và ủng hộ!
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;