// The whole home page, section by section, with the wording of the original
// one-page site (archived 19/11/2026). Text is bilingual inline: [[English||Tiếng Việt]].
// Edit here, then run `node _build/build.mjs`.

import { PHONE, EMAIL, PROFILES } from './site.mjs';
import { section, portrait } from '../lib/components.mjs';

const VCL = 'https://vcyber.work';
const profile = (id) => PROFILES.find((p) => p.id === id).url.replaceAll('&', '&amp;');

export const NAV = [
  ['biography', '[[Biography||Tiểu sử]]'],
  ['education', '[[Education||Học vấn]]'],
  ['awards', '[[Awards||Giải thưởng]]'],
  ['professional-experience', '[[Experience||Kinh nghiệm]]'],
  ['teaching', '[[Teaching||Giảng dạy]]'],
  ['areas-of-interest', '[[Interests||Lĩnh vực]]'],
  ['publications', '[[Publications||Công bố]]'],
  ['leadership', '[[Leadership||Lãnh đạo]]'],
  ['mentorship', '[[Mentorship||Hướng dẫn]]'],
  ['collaboration', '[[Collaboration||Hợp tác]]'],
  ['work', '[[Work together||Cơ hội hợp tác]]'],
  ['references', '[[References||Người giới thiệu]]'],
].map(([id, label]) => ({ id, label }));

const FOCUS = [
  '[[Cybersecurity &amp; Network Security||An ninh mạng &amp; Bảo mật mạng]]',
  '[[AI-Driven Security &amp; Machine Learning||Bảo mật ứng dụng AI &amp; Học máy]]',
  '[[Post-Quantum Cryptography||Mật mã hậu lượng tử]]',
  '[[Cryptography &amp; Secure Systems||Mật mã học &amp; Hệ thống an toàn]]',
  '[[IoT &amp; Robotic Security||Bảo mật IoT &amp; Robot]]',
];

const skills = (list) => `<p class="skills"><span class="skills-label">[[Skills||Kỹ năng]]</span>${list}</p>`;
const cert = (file) => `<a class="doc-link" href="/${file}">[[Certificate||Chứng chỉ]]</a>`;
const c = (label, file) => `${label} <a href="/${file}" aria-label="${label}">↗</a>`;

/* ------------------------------------------------------------------ Hero */

const hero = (lang) => `
<section class="hero" id="hero" aria-labelledby="hero-h">
  <div class="container hero-grid">
    <div class="hero-text">
      <h1 class="hero-name" id="hero-h">[[Dr.||TS.]] Nguyễn Đình<br>Đức Nhã</h1>
      <p class="hero-position">Tony · [[Ph.D. in Cybersecurity||Tiến sĩ An ninh mạng]]</p>
      <ul class="hero-roles">
        <li><strong>[[Assistant Professor, Computer Science (Cybersecurity, AI)||Giảng viên ngành Khoa học Máy tính (An ninh mạng, AI)]]</strong> · VinUniversity</li>
        <li><strong>[[Head of the Southern Regional Representative Office &amp; Head of Innovation||Trưởng Văn phòng Đại diện khu vực phía Nam, kiêm Lãnh đạo Đổi mới Sáng tạo]]</strong> · [[National Center for Barcode and Traceability (NCBT)||Trung tâm Mã số Mã vạch Truy xuất Nguồn gốc Quốc gia (NCBT)]]</li>
        <li><strong>[[Senior Advisor||Cố vấn cấp cao]]</strong> · VCyber Technology</li>
        <li><strong>[[President, Scientific Council||Chủ tịch Hội đồng Khoa học]]</strong> · [[Institute of Digital Transformation Research &amp; Application (IDT) under VUSTA||Viện Nghiên cứu Ứng dụng và Chuyển đổi số (IDT) thuộc VUSTA]]</li>
      </ul>
      <p class="hero-location">[[Hanoi, Vietnam||Hà Nội, Việt Nam]]</p>
      <ul class="hero-focus" aria-label="[[Research focus||Trọng tâm nghiên cứu]]">${FOCUS.map((f) => `<li>${f}</li>`).join('')}</ul>
      <div class="actions">
        <a class="btn" href="/CV_Dinh_Duc_Nha_Nguyen.pdf">[[Download CV||Tải CV]] <span aria-hidden="true">↓</span></a>
        <a class="btn btn--ghost" href="#work">[[Work together||Cùng hợp tác]] <span aria-hidden="true">→</span></a>
      </div>
    </div>
    <figure class="hero-portrait">
      ${portrait(lang)}
      <figcaption>[[Cybersecurity · AI · Post-Quantum Cryptography||An ninh mạng · AI · Mật mã hậu lượng tử]]</figcaption>
    </figure>
  </div>
</section>

<section class="contact-strip" aria-label="[[Contact||Liên hệ]]">
  <div class="container">
    <div class="contact-phone">
      <p class="contact-label">[[Contact||Liên hệ]]</p>
      <p><a class="contact-tel" href="tel:${PHONE.tel}">☎ ${PHONE.display}</a> <span class="contact-apps">(${PHONE.apps})</span></p>
    </div>
    <ul class="contact-emails">
      <li><p class="contact-label">[[Academic||Học thuật]]</p><a href="mailto:${EMAIL.academic}">${EMAIL.academic}</a></li>
      <li><p class="contact-label">[[Government &amp; public service||Công vụ &amp; nhà nước]]</p><a href="mailto:${EMAIL.publicSector}">${EMAIL.publicSector}</a></li>
      <li><p class="contact-label">[[Business||Doanh nghiệp]]</p><a href="mailto:${EMAIL.business}">${EMAIL.business}</a></li>
      <li><p class="contact-label">[[Personal||Cá nhân]]</p><a href="mailto:${EMAIL.personal}">${EMAIL.personal}</a></li>
    </ul>
  </div>
</section>`;

/* ------------------------------------------------------------- 01 Biography */

const BIO_ROLES = [
  ['[[Co-founder · BioAge||Đồng sáng lập · BioAge]]',
    '[[<strong>Co-founder of <a href="https://bioage.vn">BioAge.vn</a></strong>, a model for evaluating and improving the aging process using biological-index calculations and stem-cell gene technology.||<strong>Đồng sáng lập <a href="https://bioage.vn">BioAge.vn</a></strong>: mô hình đánh giá và cải thiện quá trình lão hoá dựa trên tính toán chỉ số sinh học và công nghệ gen tế bào gốc.]]'],
  ['[[Southern Office &amp; Innovation · NCBT||VP Đại diện phía Nam &amp; Đổi mới Sáng tạo · NCBT]]',
    '[[<strong>Head of the Southern Regional Representative Office</strong> and <strong>Head of Innovation</strong> at the National Center for Barcode and Traceability (NCBT), focusing on advanced technologies for national infrastructure: barcode, national traceability, electronic label and digital product passport.||<strong>Trưởng Văn phòng Đại diện khu vực phía Nam</strong>, kiêm <strong>Lãnh đạo bộ phận Đổi mới Sáng tạo</strong> tại Trung tâm Mã số Mã vạch Truy xuất Nguồn gốc Quốc gia (NCBT), phụ trách phát triển các công nghệ tiên tiến cho hạ tầng quốc gia: mã số mã vạch, truy xuất nguồn gốc, nhãn điện tử và hộ chiếu số sản phẩm.]]'],
  ['[[President · IDT / VUSTA||Chủ tịch HĐKH · IDT / VUSTA]]',
    '[[<strong>President of the Scientific Council</strong> at the <a href="https://idt.org.vn/gioi-thieu/ban-lanh-dao">Institute of Digital Transformation Research &amp; Application (IDT)</a> under VUSTA, leading national research strategy &amp; scientific coordination.||<strong>Chủ tịch Hội đồng Khoa học</strong> tại <a href="https://idt.org.vn/gioi-thieu/ban-lanh-dao">Viện Nghiên cứu Ứng dụng và Chuyển đổi số (IDT)</a> thuộc VUSTA, phụ trách định hướng chiến lược nghiên cứu và điều phối hoạt động khoa học ở cấp quốc gia.]]'],
  ['[[Member · NCA||Thành viên · NCA]]',
    '[[<strong>Member</strong> of the <a href="https://www.nca.org.vn/home?l=vi">National Cybersecurity Association (NCA)</a>, contributing to policy development &amp; national cyber-defense frameworks.||<strong>Thành viên</strong> <a href="https://www.nca.org.vn/home?l=vi">Hiệp hội An ninh mạng Quốc gia (NCA)</a>, tham gia xây dựng chính sách và phát triển khung phòng thủ an ninh mạng quốc gia.]]'],
  ['[[CEO · DDC||Tổng Giám đốc · DDC]]',
    '[[<strong>CEO</strong> of <a href="https://sohoadulieu.org">Data Digitization Company (DDC)</a>, providing digital-transformation &amp; data solutions for enterprise and public-sector clients.||<strong>Tổng Giám đốc</strong> <a href="https://sohoadulieu.org">Công ty Số hóa Dữ liệu (DDC)</a>, cung cấp các giải pháp chuyển đổi số và dữ liệu cho doanh nghiệp và khu vực công.]]'],
  ['[[Senior Advisor · VCyber Technology||Cố vấn cấp cao · VCyber Technology]]',
    '[[<strong>Senior Advisor</strong> at <a href="https://vcyber.vn/">VCyber Technology</a>, which builds software &amp; cybersecurity solutions for enterprise digital transformation. Flagship products: a <strong>traceability and electronic label</strong> application, <strong>OKI</strong> secure messaging and <strong>OKA</strong> secure storage.||<strong>Cố vấn cấp cao</strong> tại <a href="https://vcyber.vn/">VCyber Technology</a>, đơn vị phát triển giải pháp phần mềm và an ninh mạng cho chuyển đổi số doanh nghiệp. Sản phẩm chủ lực gồm ứng dụng <strong>truy xuất nguồn gốc và nhãn điện tử</strong>, nhắn tin an toàn <strong>OKI</strong> và lưu trữ an toàn <strong>OKA</strong>.]]'],
  ['[[Technical Advisor · Fanvity||Cố vấn Kỹ thuật · Fanvity]]',
    '[[<strong>Technical Advisor</strong> at <a href="https://fanvity.com">Fanvity</a>, an enterprise digital-transformation platform focused on National Traceability solutions.||<strong>Cố vấn Kỹ thuật</strong> tại <a href="https://fanvity.com">Fanvity</a>, nền tảng chuyển đổi số doanh nghiệp tập trung vào các giải pháp Truy xuất Nguồn gốc Quốc gia.]]'],
  ['[[CTO · VLabel||Giám đốc Kỹ thuật · VLabel]]',
    '[[<strong>CTO</strong> of <a href="https://vlabel.vn">VLabel</a>, a national platform for electronic labels and traceability solutions.||<strong>Giám đốc Kỹ thuật</strong> <a href="https://vlabel.vn">VLabel</a>, nền tảng quốc gia về nhãn điện tử và các giải pháp truy xuất nguồn gốc.]]'],
  ['[[CTO · VShare||Giám đốc Kỹ thuật · VShare]]',
    '[[<strong>CTO</strong> of <a href="https://vshare.vn">VShare</a>, an enterprise platform that brings distributed organizational data into a unified on-premise environment for analytics, reporting and AI applications.||<strong>Giám đốc Kỹ thuật</strong> <a href="https://vshare.vn">VShare</a>, nền tảng doanh nghiệp tập hợp dữ liệu phân tán của tổ chức vào một môi trường on-premise thống nhất, phục vụ phân tích, báo cáo và ứng dụng AI.]]'],
  ['[[CTO · Samanta Technology||Giám đốc Kỹ thuật · Samanta Technology]]',
    '[[<strong>CTO</strong> of <a href="https://samanta.com.vn/about">Samanta Technology</a>, a technology and digital-transformation company developing technology products in Vietnam.||<strong>Giám đốc Kỹ thuật</strong> <a href="https://samanta.com.vn/about">Samanta Technology</a>, công ty công nghệ và chuyển đổi số phát triển các sản phẩm công nghệ tại Việt Nam.]]'],
  ['[[CTO · Viriya||Giám đốc Kỹ thuật · Viriya]]',
    '[[<strong>CTO</strong> of <a href="https://viriya.com.vn">Viriya Company</a>, a company active in technology, digital transformation and AI applications in Vietnam.||<strong>Giám đốc kỹ thuật</strong> <a href="https://viriya.com.vn">Công ty Công nghệ Viriya</a>, đơn vị hoạt động trong lĩnh vực công nghệ, chuyển đổi số và ứng dụng AI tại Việt Nam.]]'],
  ['[[Technical Architect · trinhminhduc.com||Kiến trúc sư Kỹ thuật · trinhminhduc.com]]',
    '[[<strong>Technical Architect</strong> at <a href="https://trinhminhduc.com">trinhminhduc.com</a>, an online education platform.||<strong>Kiến trúc sư Kỹ thuật</strong> tại <a href="https://trinhminhduc.com">trinhminhduc.com</a>, nền tảng giáo dục trực tuyến.]]'],
];

const biography = section({
  id: 'biography', title: '[[Biography||Tiểu sử]]',
  body: `
<div class="prose prose--lead">
  <p>[[I am an <strong>Assistant Professor of Computer Science (Cybersecurity)</strong> at <strong>VinUniversity</strong> and <strong>Head of the Southern Regional Representative Office</strong>, concurrently <strong>Head of Innovation</strong>, at the <strong>National Center for Barcode and Traceability (NCBT)</strong>. I am also the <strong>Founder of <a href="${VCL}">VCyber Lab</a></strong> at VinUniversity, the <strong>Cybersecurity &amp; AI Applications Research Lab</strong>. On the industry side I serve as <strong>Senior Advisor</strong> at <a href="https://vcyber.vn/">VCyber Technology</a>, a <strong>software company</strong> developing enterprise digital-transformation products. Its flagship products include a <strong>traceability and electronic label</strong> application, <strong>OKI</strong> secure messaging and <strong>OKA</strong> secure storage. I received my <strong>PhD</strong> and completed my <strong>postdoctoral research</strong> at <strong>Deakin University</strong> (Australia), and hold a <strong>Master's degree</strong> from the <strong>Queensland University of Technology (QUT)</strong>.||Tôi là <strong>Giảng viên ngành Khoa học Máy tính (An ninh mạng)</strong> tại <strong>VinUniversity</strong>, đồng thời là <strong>Trưởng Văn phòng Đại diện khu vực phía Nam</strong>, kiêm <strong>Lãnh đạo bộ phận Đổi mới Sáng tạo</strong> tại <strong>Trung tâm Mã số Mã vạch Truy xuất Nguồn gốc Quốc gia (NCBT)</strong>. Tôi cũng là người <strong>sáng lập <a href="${VCL}">VCyber Lab</a></strong> tại VinUniversity, <strong>Phòng nghiên cứu Ứng dụng An ninh mạng và AI</strong>. Ở mảng doanh nghiệp, tôi là <strong>Cố vấn cấp cao</strong> tại <a href="https://vcyber.vn/">VCyber Technology</a>, <strong>công ty phần mềm</strong> phát triển các sản phẩm phục vụ chuyển đổi số doanh nghiệp. Sản phẩm chủ lực gồm ứng dụng <strong>truy xuất nguồn gốc và nhãn điện tử</strong>, nhắn tin an toàn <strong>OKI</strong> và lưu trữ an toàn <strong>OKA</strong>. Tôi nhận bằng <strong>Tiến sĩ</strong> và hoàn thành <strong>nghiên cứu sau tiến sĩ</strong> tại <strong>Đại học Deakin</strong> (Úc), cùng bằng <strong>Thạc sĩ</strong> tại <strong>Đại học Công nghệ Queensland (QUT)</strong>.]]</p>
  <p>[[My research centers on <strong>Post-Quantum Cryptography (PQC)</strong>, <strong>AI for Cybersecurity</strong>, <strong>IoT Security</strong> and <strong>Robotics Security</strong>. I have published across leading <strong>Q1 journals</strong> such as <strong>IEEE TDSC</strong> and <strong>IEEE TIFS</strong>, together with a range of international publications, research projects, awards and industry collaborations.||Các hướng nghiên cứu chính của tôi gồm <strong>Mật mã Hậu lượng tử (PQC)</strong>, <strong>AI cho An ninh mạng</strong>, <strong>Bảo mật IoT</strong> và <strong>Bảo mật Robot</strong>. Tôi đã công bố trên các <strong>tạp chí Q1</strong> hàng đầu như <strong>IEEE TDSC</strong> và <strong>IEEE TIFS</strong>, bên cạnh nhiều công bố quốc tế, dự án nghiên cứu, giải thưởng và hoạt động hợp tác với doanh nghiệp.]]</p>
  <p>[[Beyond my academic work, I also work across <strong>government, academia and industry</strong>, particularly in <strong>cybersecurity, digital transformation and national digital infrastructure</strong>. My work includes supporting regulators and enterprises in implementing Vietnamese technical standards such as <strong>QCVN 11 (QCVN 135)</strong>, <strong>QCVN 06</strong>, <strong>QCVN 134</strong> and <strong>QCVN 14</strong>, providing technical consulting for <strong>regulatory bodies, testing laboratories and camera manufacturers</strong> in meeting the required technical criteria.||Bên cạnh công việc học thuật, tôi còn tham gia các hoạt động kết nối <strong>khu vực công, học thuật và doanh nghiệp</strong>, đặc biệt trong <strong>an ninh mạng, chuyển đổi số và hạ tầng số quốc gia</strong>. Công việc của tôi bao gồm hỗ trợ cơ quan quản lý và doanh nghiệp triển khai các Quy chuẩn Việt Nam như <strong>QCVN 11 (QCVN 135)</strong>, <strong>QCVN 06</strong>, <strong>QCVN 134</strong> và <strong>QCVN 14</strong>, trong đó có tư vấn kỹ thuật cho <strong>cơ quan quản lý, phòng thử nghiệm và doanh nghiệp camera</strong> nhằm đáp ứng các tiêu chí kỹ thuật bắt buộc.]]</p>
  <p>[[Some <strong>leadership and advisory roles</strong>:||Một số <strong>vai trò lãnh đạo và cố vấn</strong> tiêu biểu:]]</p>
</div>
<ul class="role-list">
  ${BIO_ROLES.map(([kind, text]) => `<li class="role"><p class="role-kind">${kind}</p><p>${text}</p></li>`).join('\n  ')}
</ul>
<div class="prose">
  <p>[[I hold <strong>professional certifications</strong> in cybersecurity (<em>Certified Ethical Hacker</em>), machine learning (IBM), IoT, quantum computing, cryptography and blockchain. My main areas of expertise include <strong>cybersecurity, AI, network security</strong>, and <strong>quantum technology</strong>, with an interdisciplinary focus on <strong>machine learning</strong> and <strong>data science</strong>.||Tôi sở hữu các <strong>chứng chỉ chuyên môn</strong> về an ninh mạng (<em>Certified Ethical Hacker</em>), học máy (IBM), IoT, điện toán lượng tử, mật mã học và blockchain. Các lĩnh vực chuyên môn chính của tôi gồm <strong>an ninh mạng, AI, bảo mật mạng</strong> và <strong>công nghệ lượng tử</strong>, với định hướng liên ngành về <strong>học máy</strong> và <strong>khoa học dữ liệu</strong>.]]</p>
</div>
<ul class="doc-list">
  <li><a href="/CV_Dinh_Duc_Nha_Nguyen.pdf">[[One-page CV||CV một trang]]</a></li>
  <li><a href="/Research_Statement_Dinh_Duc_Nha_Nguyen.pdf">[[Research Statement||Định hướng Nghiên cứu]]</a></li>
  <li><a href="/Teaching_Statement_Dinh_Duc_Nha_Nguyen.pdf">[[Teaching Statement||Định hướng Giảng dạy]]</a></li>
  <li><a href="/References_Dinh_Duc_Nha_Nguyen.pdf">[[References||Người giới thiệu]]</a></li>
</ul>`,
});

/* ------------------------------------------------------------- 02 Education */

const CERT_GROUPS = [
  ['[[Cybersecurity||An ninh mạng]]', [
    c('Certified Ethical Hacking v12', 'cert10_ceh.pdf'), c('Network Security', 'cert31_network_secu.pdf'),
    c('Cyber Attack Countermeasures', 'cert40_attack_counter.pdf'), c('Pentesting Fundamentals', 'cert41_pentester_fundamental.pdf')]],
  ['[[Data Science &amp; AI||Khoa học Dữ liệu &amp; AI]]', [
    c('IBM Data Science Professional', 'cert35_data.pdf'), c('IBM Machine Learning Professional', 'cert11_machine_learning.pdf'),
    c('Generative AI Foundations', 'cert33_genai.pdf'), c('GenAI with LLMs', 'cert39_genAI_LLM.pdf'),
    c('AI Governance &amp; ISO 42001 Readiness', 'cert42-iso42001.pdf')]],
  ['[[Internet of Things||Internet vạn vật]]', [
    c('IoT Devices', 'cert13_iot_devices.pdf'), c('IoT Communications', 'cert14_iot_comm.pdf'),
    c('IoT Networking', 'cert15_iot_network.pdf'), c('IoT Cloud', 'cert37_iot_cloud.pdf'),
    c('Hands-on IoT Specialization', 'cert38_iot.pdf')]],
  ['[[Cryptography &amp; Quantum||Mật mã &amp; Lượng tử]]', [
    c('Cryptography &amp; Information Theory', 'cert19_cryptography.pdf'), c('Quantum Computing for Everyone', 'cert16_quantum4e.pdf'),
    c('Python for Quantum Computing', 'cert17_quantum_python.pdf'), c('Blockchain Cryptography', 'cert18_blockchain_cryptography.pdf')]],
  ['[[Networks &amp; Platforms||Mạng &amp; Nền tảng]]', [
    c('Computer Networking', 'cert29_network.pdf'), c('Network Automation', 'cert30_network_aut.pdf'),
    c('Cloud Computing', 'cert20_cloud.pdf'), c('OS Foundations', 'cert23_os.pdf'), c('Kali Linux', 'cert28_kali.pdf')]],
  ['[[Software, Blockchain &amp; Research||Phần mềm, Blockchain &amp; Nghiên cứu]]', [
    c('Object-Oriented Programming', 'cert21_oop.pdf'), c('Blockchain Business Models', 'cert12_block_chain_businessmodel.pdf'),
    c('University Teaching', 'cert24_uni_teaching.pdf'), c('Grant Development', 'cert25_grant.pdf'),
    c('Research Management', 'cert32_research_mana.pdf')]],
];

const education = section({
  id: 'education', title: '[[Education||Học vấn]]', tone: 'ivory',
  lede: '[[A learning path that has progressed from electronics to a doctorate in cybersecurity.||Hành trình học tập phát triển từ điện tử đến bậc Tiến sĩ an ninh mạng.]]',
  body: `
<ol class="timeline">
  <li>
    <p class="tl-date">2020-2024</p>
    <div>
      <h3 class="item-title">[[Doctor of Philosophy in Cybersecurity||Tiến sĩ An ninh mạng]]</h3>
      <p class="item-meta">[[Deakin University · Melbourne, Australia||Đại học Deakin · Melbourne, Úc]]</p>
      <p>[[Thesis: <em>Developing an Authentication Framework for Next Generation Networks.</em>||Luận án: <em>Phát triển mô hình xác thực cho thế hệ mạng tiếp theo.</em>]]</p>
      <p class="note">[[Award: School of IT 2022 Student Excellence Award, Higher Degree by Research.||Giải thưởng: Sinh viên Nghiên cứu Xuất sắc 2022, Khoa CNTT (bậc Sau đại học).]]</p>
      ${cert('Qualification_PhD_AwardCertificate.pdf')}
    </div>
  </li>
  <li>
    <p class="tl-date">2018-2020</p>
    <div>
      <h3 class="item-title">[[Master of Information Technology (Networks)||Thạc sĩ Công nghệ Thông tin, chuyên ngành Mạng]]</h3>
      <p class="item-meta">[[Queensland University of Technology (QUT) · Brisbane, Australia||Đại học Công nghệ Queensland (QUT) · Brisbane, Úc]]</p>
      <p>[[Graduated with Distinction (GPA 6.118 / ≈ 81% WAM).||Tốt nghiệp loại Xuất sắc (GPA 6.118 / ≈ 81% WAM).]]</p>
      <p class="note">[[Award: Dean's List for excellent academic performance, S2 2019 &amp; S1 2020.||Giải thưởng: Dean's List cho thành tích học tập xuất sắc, HK2 2019 và HK1 2020.]]</p>
      ${cert('Qualification_MasterOfIT_AwardCertificate.pdf')}
    </div>
  </li>
  <li>
    <p class="tl-date">2006-2011</p>
    <div>
      <h3 class="item-title">[[Bachelor of Telecommunication &amp; Electronics||Kỹ sư Điện tử &amp; Viễn thông]]</h3>
      <p class="item-meta">[[Post &amp; Telecommunications Institute of Technology (PTIT) · Ho Chi Minh City, Vietnam||Học viện Công nghệ Bưu chính Viễn thông (PTIT) · TP. Hồ Chí Minh, Việt Nam]]</p>
      ${cert('Dinh_Duc_Nha_Nguyen_bachelor_cert.pdf')}
    </div>
  </li>
</ol>
<div class="sub-block">
  <h3 class="sub-heading">[[Professional Certifications||Chứng chỉ Chuyên môn]]</h3>
  <ul class="rows">
    ${CERT_GROUPS.map(([label, items]) => `<li class="row-2"><p class="row-label">${label}</p><p class="cert-items">${items.join(' · ')}</p></li>`).join('\n    ')}
  </ul>
</div>`,
});

/* ---------------------------------------------------------------- 03 Awards */

const awards = section({
  id: 'awards', title: '[[Awards||Giải thưởng]]',
  lede: '[[Selected academic and cybersecurity achievements at the international level.||Một số thành tích học thuật và an ninh mạng ở cấp quốc tế.]]',
  body: `
<ol class="timeline timeline--numeral">
  <li>
    <p class="tl-date">I</p>
    <div>
      <h3 class="item-title">[[Third Place, Country to Country CTF (C2C) Cybersecurity Challenge 2022||Giải Ba, Cuộc thi CTF An ninh mạng C2C (Country to Country) 2022]] <span class="tag">MIT</span></h3>
      <p>[[An international CTF competition series organised by the International Cyber Security Center of Excellence (INCS-CoE) in collaboration with leading universities. The 2022 edition was hosted by the Massachusetts Institute of Technology (MIT).||Chuỗi cuộc thi CTF quốc tế do Trung tâm Xuất sắc An ninh mạng Quốc tế (INCS-CoE) phối hợp cùng các trường đại học hàng đầu tổ chức. Kỳ thi năm 2022 được Viện Công nghệ Massachusetts (MIT) đăng cai.]]</p>
      <p class="link-row"><a class="doc-link" href="/cert1.png">[[Result||Kết quả]]</a><a class="doc-link" href="/cert2.png">[[About||Giới thiệu]]</a></p>
    </div>
  </li>
  <li>
    <p class="tl-date">II</p>
    <div>
      <h3 class="item-title">[[Student Excellence Award, Higher Degree by Research 2022||Giải thưởng Sinh viên Xuất sắc, Nghiên cứu Sau đại học 2022]] <span class="tag">Deakin</span></h3>
      <p>[[Presented to the School of Information Technology HDR student with the strongest research and academic performance.||Trao cho nghiên cứu sinh bậc HDR của Khoa Công nghệ Thông tin có thành tích nghiên cứu và học thuật nổi bật nhất.]]</p>
      <p class="link-row">${cert('cert3.png')}</p>
    </div>
  </li>
  <li>
    <p class="tl-date">III</p>
    <div>
      <h3 class="item-title">[[Dean's List: Excellent Academic Performance (2019, 2020)||Dean's List: Thành tích Học tập Xuất sắc (2019, 2020)]] <span class="tag">QUT</span></h3>
      <p>[[Named to the Dean's List for excellent academic performance in Semester 2, 2019 and Semester 1, 2020 at Queensland University of Technology.||Được ghi danh vào Dean's List nhờ thành tích học tập xuất sắc trong Học kỳ 2/2019 và Học kỳ 1/2020 tại Đại học Công nghệ Queensland.]]</p>
      <p class="link-row">${cert('cert4.png')}</p>
    </div>
  </li>
</ol>`,
});

/* ------------------------------------------------------------ 04 Experience */

const job = ({ date, org, title, body, extra = '', skillList }) => `
  <li>
    <p class="tl-date">${date}</p>
    <div>
      <p class="item-meta item-meta--caps">${org}</p>
      <h3 class="item-title">${title}</h3>
      <div class="job-body">${body}</div>
      ${extra}
      ${skills(skillList)}
    </div>
  </li>`;

const experience = section({
  id: 'professional-experience', title: '[[Professional Experience||Kinh nghiệm chuyên môn]]', tone: 'ivory',
  lede: '[[Experience across academic research, industry and national digital infrastructure.||Kinh nghiệm trải rộng từ nghiên cứu học thuật, doanh nghiệp đến hạ tầng số quốc gia.]]',
  body: `
<ol class="timeline">
${job({
  date: '[[03/2026 to present||03/2026 đến nay]]', org: '[[National Center for Barcode and Traceability (NCBT)||Trung tâm Mã số Mã vạch Truy xuất Nguồn gốc Quốc gia (NCBT)]]',
  title: '[[Head of the Southern Regional Representative Office &amp; Head of Innovation||Trưởng Văn phòng Đại diện khu vực phía Nam, kiêm Lãnh đạo bộ phận Đổi mới Sáng tạo]]',
  body: '<p>[[Research and develop advanced technologies for national digital infrastructure, including <em>barcode, national traceability, electronic label, digital product passport</em> and related national digital platforms.||Nghiên cứu và phát triển các công nghệ phục vụ hạ tầng số quốc gia, gồm: <em>mã số mã vạch, truy xuất nguồn gốc quốc gia, nhãn điện tử, hộ chiếu số sản phẩm</em> và các nền tảng số quốc gia liên quan.]]</p>',
  skillList: '[[Barcode · National Traceability · Electronic Label · Digital Product Passport · National digital platforms||Mã số mã vạch · Truy xuất nguồn gốc quốc gia · Nhãn điện tử · Hộ chiếu số sản phẩm · Nền tảng số quốc gia]]',
})}
${job({
  date: '[[12/2024 to present||12/2024 đến nay]]', org: '[[VinUniversity, Hanoi||VinUniversity, Hà Nội]]',
  title: '[[Assistant Professor||Giảng viên]]',
  body: `<p>[[<em>Teaching:</em> Develop and teach accredited courses in cryptography, cybersecurity and networks using active-learning methods; supervise undergraduate and graduate students.||<em>Giảng dạy:</em> Xây dựng và giảng dạy các học phần được kiểm định về mật mã, an ninh mạng và mạng máy tính theo phương pháp học chủ động; hướng dẫn sinh viên đại học và sau đại học.]]</p>
        <p>[[<em>Research:</em> Conduct and publish research in cybersecurity and network security, seek external funding, and contribute to interdisciplinary communities; with annual targets for Q1 publications and funded projects.||<em>Nghiên cứu:</em> Thực hiện và công bố nghiên cứu về an ninh mạng và bảo mật mạng, tìm kiếm nguồn tài trợ bên ngoài và tham gia các cộng đồng liên ngành; đặt mục tiêu hằng năm về bài Q1 và dự án được tài trợ.]]</p>
        <p>[[<em>Service:</em> Advise and support students, contribute to college initiatives, and participate in faculty and recruitment committees.||<em>Phục vụ:</em> Cố vấn và hỗ trợ sinh viên, đóng góp cho các sáng kiến của trường, đồng thời tham gia các hội đồng khoa và tuyển dụng.]]</p>`,
  skillList: '[[IDS/IPS/SIEM · AES/RSA/SHA · SSL/TLS/IPsec · Metasploit · Python/C/C++ · ML for security · Blockchain · Quantum · NIST/ISO 27001||IDS/IPS/SIEM · AES/RSA/SHA · SSL/TLS/IPsec · Metasploit · Python/C/C++ · Học máy cho bảo mật · Blockchain · Lượng tử · NIST/ISO 27001]]',
})}
${job({
  date: '[[06/2023 to 11/2024||06/2023 đến 11/2024]]', org: '[[Deakin University, Melbourne||Đại học Deakin, Melbourne]]',
  title: '[[Associate Research Fellow||Nghiên cứu viên Liên kết]]',
  body: `<p>[[<em>SOCRATES project (PQC &amp; VPN):</em> Designed and implemented an automated hybrid Post-Quantum Cryptography system to mitigate both classical and quantum attacks; deployed it on cloud servers and evaluated it under different network conditions.||<em>Dự án SOCRATES (PQC &amp; VPN):</em> Thiết kế và triển khai hệ mật mã hậu lượng tử lai tự động nhằm giảm thiểu cả tấn công cổ điển và tấn công lượng tử; vận hành trên máy chủ đám mây và đánh giá trong nhiều điều kiện mạng khác nhau.]]</p>
        <p>[[Publication submitted to <em>IEEE TIFS</em> (under review).||Công bố đã gửi tới <em>IEEE TIFS</em> (đang phản biện).]]</p>`,
  skillList: 'C · IKEv2 · VPN · PQC · Docker/VMware/Hyper-V · Bash/PowerShell',
})}
${job({
  date: '[[02/2022 to 06/2023||02/2022 đến 06/2023]]', org: '[[Deakin University, Melbourne||Đại học Deakin, Melbourne]]',
  title: '[[Research Assistant &amp; Casual Teaching||Trợ lý Nghiên cứu &amp; Giảng dạy]]',
  body: `<p class="sub-title">[[Some projects||Dự án tiêu biểu]]</p>
        <ul class="dash-list">
          <li>Accurate Decision-making for Network Security with Compromised Data [[(Dept. of Defence), under major revision at IEEE TMC.||(Bộ Quốc phòng Úc), đang chỉnh sửa lớn (major revision) tại IEEE TMC.]]</li>
          <li>Impersonation Attack Detection in IoT Networks (<a href="/paper7.pdf">IEEE GLOBECOM</a>).</li>
          <li>Novel Intrusion Detection in Next-Gen Cloud-Native Networks (<a href="/paper4.pdf">IEEE IoT-J</a>).</li>
          <li>Next-Gen Heterogeneous IoT Networks &amp; Node Authentication ([[tutorial||bài hướng dẫn]], <a href="/paper9.pdf">IEEE IoT Magazine</a>).</li>
          <li>Intrusion Detection Architecture in 5G Networks (<a href="/paper5.pdf">IEEE TNSM</a>).</li>
        </ul>
        <p class="sub-title">[[Teaching||Giảng dạy]]</p>
        <p>[[At Deakin University: Cyber Security Management (2023) · Cyber Security Analytics (2022-2023) · Advanced Network Security (2022).||Tại Đại học Deakin: Quản lý An ninh mạng (2023) · Phân tích An ninh mạng (2022-2023) · An ninh mạng nâng cao (2022).]]</p>`,
  skillList: '[[Python · MATLAB · OSM MANO (5G) · ML (supervised/unsupervised/deep) · AWS/GCP/OpenStack||Python · MATLAB · OSM MANO (5G) · Học máy (có giám sát/không giám sát/học sâu) · AWS/GCP/OpenStack]]',
})}
${job({
  date: '[[08/2017 to 02/2018||08/2017 đến 02/2018]]', org: '[[Tech JDI, Ho Chi Minh City||Tech JDI, TP. Hồ Chí Minh]]',
  title: '[[Senior Test Engineer||Kỹ sư Kiểm thử Cao cấp]]',
  body: `<p>[[Designed test plans, cases, scripts and supporting data; analysed and reported test activities; provided security, platform, service and infrastructure expertise.||Thiết kế kế hoạch kiểm thử, ca kiểm thử, script và dữ liệu hỗ trợ; phân tích và báo cáo hoạt động kiểm thử; cung cấp chuyên môn về bảo mật, nền tảng, dịch vụ và hạ tầng.]]</p>
        <p>[[<em>Achievement:</em> Delivered the V-Key platform; led the EJBCA migration to WebLogic 12c, saving €98K for Product Engineering.||<em>Thành tựu:</em> Bàn giao nền tảng V-Key; dẫn dắt việc di trú EJBCA sang WebLogic 12c, tiết kiệm 98.000 € cho bộ phận Kỹ thuật Sản phẩm.]]</p>`,
  skillList: 'Java · Python · Selenium/JUnit/Jenkins · AWS/GCP/OpenStack · Docker/VMware',
})}
${job({
  date: '[[03/2013 to 07/2017||03/2013 đến 07/2017]]', org: '[[TMA Solution, Ho Chi Minh City||TMA Solution, TP. Hồ Chí Minh]]',
  title: '[[Test Analyst &amp; Networking Specialist||Chuyên viên Kiểm thử &amp; Mạng]]',
  body: `<p>[[Designed and executed test scenarios, cases and automated scripts; built scalable, robust automation frameworks; configured lab network topologies.||Thiết kế và thực thi kịch bản, ca kiểm thử và script tự động hóa; xây dựng framework tự động hóa mạnh mẽ, có khả năng mở rộng; cấu hình topology mạng cho phòng lab.]]</p>
        <p>[[<em>Achievements:</em> Excellent CC network support (2016); Fast-Track program for top 5% (2015); PA5 highest appraisal, promoted 2 levels (2014).||<em>Thành tựu:</em> Hỗ trợ mạng CC xuất sắc (2016); chương trình Fast-Track dành cho top 5% (2015); PA5, mức đánh giá cao nhất, thăng 2 bậc (2014).]]</p>`,
  skillList: '[[Python · Selenium/JUnit/Jenkins · AWS/GCP/OpenStack · Network protocols &amp; devices||Python · Selenium/JUnit/Jenkins · AWS/GCP/OpenStack · Giao thức &amp; thiết bị mạng]]',
})}
${job({
  date: '[[10/2011 to 01/2013||10/2011 đến 01/2013]]', org: '[[VNPT, Vietnam||VNPT, Việt Nam]]',
  title: '[[Networking Specialist||Chuyên viên Mạng]]',
  body: `<p>[[Set up and configured the topology for Vietnam's network backbone; troubleshooting 24/7; planned, designed and managed all LAN/WAN projects.||Thiết lập và cấu hình topology cho hạ tầng backbone mạng Việt Nam; xử lý sự cố 24/7; lập kế hoạch, thiết kế và quản lý toàn bộ dự án LAN/WAN.]]</p>`,
  skillList: '[[Python · Bash/PowerShell · Docker/VMware · Network protocols · Switches &amp; routers||Python · Bash/PowerShell · Docker/VMware · Giao thức mạng · Switch &amp; router]]',
})}
</ol>`,
});

/* -------------------------------------------------------------- 05 Teaching */

const course = ({ code = '', name, meta, links = '', text, skillList }) => `
  <li class="course">
    <p class="course-code">${code}</p>
    <div>
      <h3 class="item-title">${name}</h3>
      <p class="item-meta">${meta}</p>
      <p>${text}</p>
      ${links ? `<p class="link-row">${links}</p>` : ''}
      ${skillList ? skills(skillList) : ''}
    </div>
  </li>`;

const fb = (file, label) => `<a class="doc-link" href="/${file}">${label}</a>`;

const teaching = section({
  id: 'teaching', title: '[[Teaching Experience||Kinh nghiệm giảng dạy]]',
  lede: '[[Knowledge engineered to be mastered, and measured.||Tri thức được thiết kế để chinh phục, và để đo lường được.]]',
  body: `
<ol class="course-list">
${course({
  code: 'COMP4030', name: '[[Cybersecurity||An ninh mạng]]', meta: 'VinUniversity · 2026',
  text: '[[An updated cybersecurity course for 2026 at VinUniversity, building on adversarial thinking, secure system design, user authentication, cryptography and real-world threat analysis.||Học phần an ninh mạng cập nhật năm 2026 tại VinUniversity, xây dựng tư duy đối kháng, thiết kế hệ thống an toàn, xác thực người dùng, mật mã và phân tích mối đe dọa thực tế.]]',
})}
${course({
  code: 'COMP4050', name: '[[Cryptography||Mật mã học]]', meta: 'VinUniversity · 2026',
  text: '[[An updated cryptography course for 2026, covering one-way functions, encryption, digital signatures, pseudo-random generation, zero-knowledge and secure protocols with rigorous proofs of security.||Học phần mật mã học cập nhật năm 2026, gồm hàm một chiều, mã hóa, chữ ký số, sinh số giả ngẫu nhiên, zero-knowledge và các giao thức an toàn cùng chứng minh bảo mật chặt chẽ.]]',
})}
${course({
  code: 'COMP3050', name: '[[Networks||Mạng máy tính]]', meta: 'VinUniversity',
  text: '[[Teaches computer networking with an emphasis on the Internet: the Web, email and peer-to-peer networking; data transmission and encoding; circuit and packet switching; LAN technologies; routing, switching and congestion control; network security; and wireless and multimedia networking including 4G/5G, WiFi and Bluetooth.||Giảng dạy mạng máy tính với trọng tâm về Internet: Web, email và mạng ngang hàng; truyền và mã hóa dữ liệu; chuyển mạch kênh và chuyển mạch gói; công nghệ LAN; định tuyến, chuyển mạch và kiểm soát tắc nghẽn; an ninh mạng; cùng mạng không dây và đa phương tiện gồm 4G/5G, WiFi và Bluetooth.]]',
  skillList: '[[Web · Email · P2P · Data transmission &amp; encoding · Circuit &amp; packet switching · LAN · Routing · Congestion control · Network security · 4G/5G · WiFi · Bluetooth||Web · Email · P2P · Truyền &amp; mã hóa dữ liệu · Chuyển mạch kênh &amp; gói · LAN · Định tuyến · Kiểm soát tắc nghẽn · An ninh mạng · 4G/5G · WiFi · Bluetooth]]',
})}
${course({
  code: 'COMP2040', name: '[[Operating Systems||Hệ điều hành]]', meta: 'VinUniversity',
  text: '[[Covers systems programming and operating systems: concurrency, scheduling and synchronization; memory management; file systems; security; networking; and parallel and distributed computing.||Bao quát lập trình hệ thống và hệ điều hành: tương tranh, lập lịch và đồng bộ hóa; quản lý bộ nhớ; hệ thống tệp; bảo mật; mạng; cùng tính toán song song và phân tán.]]',
  skillList: '[[Systems programming · Concurrency · Scheduling · Synchronization · Memory management · File systems · Security · Networking · Parallel &amp; distributed computing||Lập trình hệ thống · Tương tranh · Lập lịch · Đồng bộ hóa · Quản lý bộ nhớ · Hệ thống tệp · Bảo mật · Mạng · Tính toán song song &amp; phân tán]]',
})}
${course({
  name: '[[Cyber Security||An ninh mạng]]', meta: 'VinUniversity · 2025',
  text: '[[Covers the technical and social understanding of why security and privacy matter, how to think adversarially, and how (and how not) to design systems and products: user authentication, cryptography, malware, behavioural economics in security, human factors, privacy and anonymity, side channels, decoys and deception, and adversarial modelling, grounded in real-world systems and attacks (Bitcoin, Stuxnet, retailer breaches, implantable medical devices, health apps).||Bao quát hiểu biết kỹ thuật và xã hội về tầm quan trọng của bảo mật và quyền riêng tư, về tư duy đối kháng, và về cách thiết kế (cũng như cách không nên thiết kế) hệ thống và sản phẩm: xác thực người dùng, mật mã, mã độc, kinh tế học hành vi trong bảo mật, yếu tố con người, quyền riêng tư và ẩn danh, kênh kề, mồi nhử và nghi binh, mô hình hóa đối kháng. Tất cả đặt trên nền các hệ thống và cuộc tấn công có thật: Bitcoin, Stuxnet, các vụ xâm nhập hệ thống bán lẻ, thiết bị y tế cấy ghép, ứng dụng sức khỏe.]]',
  skillList: '[[User authentication · Cryptography · Malware analysis · Human factors · Privacy · Side channels · Adversarial modeling · Cybersecurity ethics||Xác thực người dùng · Mật mã · Phân tích mã độc · Yếu tố con người · Quyền riêng tư · Kênh kề · Mô hình hóa đối kháng · Đạo đức an ninh mạng]]',
})}
${course({
  name: '[[Cryptography||Mật mã học]]', meta: 'VinUniversity · 2025',
  text: '[[An introductory course in cryptography: one-way functions, encryption, digital signatures, pseudo-random number generation, zero-knowledge and basic protocols, with emphasis on fundamental notions and constructions with proofs of security based on precise definitions and assumptions.||Môn nhập môn mật mã học: hàm một chiều, mã hóa, chữ ký số, sinh số giả ngẫu nhiên, zero-knowledge và các giao thức cơ bản. Trọng tâm là các khái niệm và cấu trúc nền tảng cùng chứng minh tính bảo mật dựa trên định nghĩa và giả định chặt chẽ.]]',
  skillList: '[[One-way functions · Encryption · Digital signatures · Zero-knowledge · Security proofs||Hàm một chiều · Mã hóa · Chữ ký số · Zero-knowledge · Chứng minh bảo mật]]',
})}
${course({
  name: '[[Cyber Security Management||Quản lý An ninh mạng]]', meta: 'Deakin · 2023 · <strong>[[100% satisfaction||100% hài lòng]]</strong>',
  links: fb('feedback_SIT284_T1_2023.png', '[[Student comments||Nhận xét SV]]'),
  text: '[[Foundations of cyber security management for organisations: security assessment, policy development and risk management through methodological and procedural techniques: contingency planning, risk assessment, compliance standards, legal and ethical issues, SETA, incident response and auditing.||Nền tảng quản lý an ninh mạng cho tổ chức: đánh giá an ninh, xây dựng chính sách và quản lý rủi ro thông qua các kỹ thuật phương pháp luận và quy trình, gồm kế hoạch dự phòng, đánh giá rủi ro, tiêu chuẩn tuân thủ, vấn đề pháp lý và đạo đức, SETA, ứng phó sự cố và kiểm toán.]]',
})}
${course({
  name: '[[Cyber Security Analytics||Phân tích An ninh mạng]]', meta: 'Deakin · 2022-2023 · <strong>[[100% satisfaction||100% hài lòng]]</strong>',
  links: fb('feedback_SIT_384_T1_2023.png', '[[Comments||Nhận xét]]') + fb('feedback_SIT_384_T1_2022.png', '[[More||Thêm]]'),
  text: '[[Tutor for the subject. Students learn the data-analytical methodologies used to investigate cyber security problems: processing and analysing data relevant to security systems and applications, and the scripting techniques and solutions required for data analytics in a cyber security context.||Trợ giảng môn học. Sinh viên học các phương pháp phân tích dữ liệu để nghiên cứu vấn đề an ninh mạng: xử lý và phân tích dữ liệu liên quan đến hệ thống, ứng dụng bảo mật, cùng các kỹ thuật lập trình và giải pháp phân tích dữ liệu trong bối cảnh an ninh mạng.]]',
  skillList: '[[Security · Machine Learning · Python · Artificial Intelligence||Bảo mật · Học máy · Python · Trí tuệ nhân tạo]]',
})}
${course({
  name: '[[Advanced Network Security||An ninh mạng nâng cao]]', meta: 'Deakin · 2022 · <strong>[[92.9% satisfaction||92,9% hài lòng]]</strong>',
  links: fb('feedback_SIT325_T2_2022.png', '[[Student comments||Nhận xét SV]]'),
  text: '[[Tutor for the subject. Gives network-security-minor students the advanced understanding of networks needed for success, covering advanced and emerging technologies such as Software-Defined Networks, IoT, and AI-based networking.||Trợ giảng môn học. Trang bị cho sinh viên chuyên ngành phụ an ninh mạng kiến thức nâng cao về mạng, bao gồm các công nghệ tiên tiến và mới nổi như Mạng định nghĩa bằng phần mềm (SDN), IoT và mạng dựa trên AI.]]',
  skillList: '[[5G · Network Security · IoT · Machine Learning · Python · Physical Security||5G · An ninh mạng · IoT · Học máy · Python · An ninh vật lý]]',
})}
</ol>`,
});

/* ---------------------------------------------------------- 06 Interests */

const interests = section({
  id: 'areas-of-interest', title: '[[Areas of Interest||Lĩnh vực quan tâm]]', tone: 'ivory',
  lede: '[[Seven research frontiers, one mission: securing the intelligent future.||Bảy hướng nghiên cứu, một sứ mệnh: bảo vệ tương lai thông minh.]]',
  body: `
<ol class="interest-grid">
  <li>[[Machine Learning &amp; AI in Cybersecurity||Học máy &amp; AI trong An ninh mạng]]</li>
  <li>[[AI Applications||Các ứng dụng AI]]</li>
  <li>[[IoT Intrusion Detection||Phát hiện xâm nhập IoT]]</li>
  <li>[[Cryptography||Mật mã học]]</li>
  <li>[[Next-Generation Network Security||An ninh mạng thế hệ mới]]</li>
  <li>[[Post-Quantum Cryptography (PQC)||Mật mã hậu lượng tử (PQC)]]</li>
  <li>[[VPN Technologies||Công nghệ VPN]]</li>
</ol>`,
});

/* ---------------------------------------------------------- 07 Publications */

const PUBS = [
  { cite: 'K. Sood, S. Liu, <strong>D. D. N. Nguyen</strong>, N. Kumar, B. Feng, S. Yu, "Alleviating Data Sparsity to Enhance AI Models Robustness in IoT Network Security Context," <i>IEEE Transactions on Mobile Computing</i>, doi:10.1109/TMC.2025.3525463.', pdf: 'paper11.pdf' },
  { cite: 'S. W. Shah, <strong>D. D. N. Nguyen</strong>, R. Doss, W. Armstrong, P. Gauravaram, "Double-Signed Fragmented DNSSEC for Countering Quantum Threat," <i>arXiv</i> preprint arXiv:2411.07535.', pdf: 'paper10.pdf' },
  { q1: true, cite: '<strong>D. D. N. Nguyen</strong> et al., "Design and Robust Evaluation of Next Generation Node Authentication Approach," <i>IEEE Transactions on Dependable and Secure Computing</i>, doi:10.1109/TDSC.2024.3373778.', impact: '6.407', pdf: 'paper1.pdf' },
  { q1: true, cite: 'G. Singh, K. Sood, P. Rajalakshmi, <strong>D. D. N. Nguyen</strong>, Y. Xiang, "Evaluating Federated Learning-Based Intrusion Detection for Next Generation Networks," <i>IEEE Transactions on Network and Service Management</i>, 21(4):4816-4829, 2024, doi:10.1109/TNSM.2024.3385385.', impact: '5.853', pdf: 'paper2.pdf' },
  { cite: 'K. Sood, <strong>D. D. N. Nguyen</strong>, Y. Qu, L. Cui, K. K. Karmakar, S. Yu, "Security Challenges and Potential Solutions in Aerial-Terrestrial Wireless Networking," <i>IEEE Internet of Things Magazine</i>, 6(4):118-123, 2023, doi:10.1109/IOTM.001.2300024.', pdf: 'paper3.pdf' },
  { q1: true, cite: '<strong>D. D. N. Nguyen</strong>, K. Sood, Y. Xiang, L. Gao, L. Chi, S. Yu, "Toward IoT Node Authentication Mechanism in Next Generation Networks," <i>IEEE Internet of Things Journal</i>, 10(15):13333-13341, 2023, doi:10.1109/JIOT.2023.3262822.', impact: '9.936', pdf: 'paper4.pdf' },
  { q1: true, cite: 'K. Sood, <strong>D. D. N. Nguyen</strong>, M. R. Nosouhi, N. Kumar, F. Jiang, M. Chowdhury, R. Doss, "Performance Evaluation of a Novel Intrusion Detection System in Next Generation Networks," <i>IEEE Transactions on Network and Service Management</i>, 20(3):3831-3847, 2023, doi:10.1109/TNSM.2023.3242270.', impact: '5.853', pdf: 'paper5.pdf' },
  { q1: true, cite: 'K. Sood, M. R. Nosouhi, <strong>D. D. N. Nguyen</strong>, F. Jiang, M. Chowdhury, R. Doss, "Intrusion Detection Scheme With Dimensionality Reduction in Next Generation Networks," <i>IEEE Transactions on Information Forensics and Security</i>, 18:965-979, 2023, doi:10.1109/TIFS.2022.3233777.', impact: '7.178', pdf: 'paper6.pdf' },
  { cite: '<strong>D. D. N. Nguyen</strong>, K. Sood, Y. Xiang, L. Gao, L. Chi, "Impersonation Attack Detection in IoT Networks," <i>IEEE GLOBECOM 2022</i>, Rio de Janeiro, pp. 6061-6066, doi:10.1109/GLOBECOM48099.2022.10001392.', pdf: 'paper7.pdf' },
  { cite: '<strong>D. D. N. Nguyen</strong>, K. Sood, M. R. Nosouhi, Y. Xiang, L. Gao, L. Chi, "RF Fingerprinting-Based IoT Node Authentication Using Mahalanobis Distance Correlation Theory," <i>IEEE Networking Letters</i>, 4(2):78-81, 2022, doi:10.1109/LNET.2022.3167665.', pdf: 'paper8.pdf' },
  { cite: 'K. Sood, S. Yu, <strong>D. D. N. Nguyen</strong>, Y. Xiang, B. Feng, X. Zhang, "A Tutorial on Next Generation Heterogeneous IoT Networks and Node Authentication," <i>IEEE Internet of Things Magazine</i>, 4(4):120-126, 2021, doi:10.1109/IOTM.001.2100115.', pdf: 'paper9.pdf' },
];

const scholar = profile('scholar');
const orcid = profile('orcid');

const publications = section({
  id: 'publications', title: '[[Publications||Công bố khoa học]]',
  lede: '[[A growing library of peer-reviewed research in the world\'s top venues.||Một thư viện nghiên cứu bình duyệt không ngừng mở rộng trên các tạp chí và hội nghị hàng đầu thế giới.]]',
  body: `
<div class="prose">
  <p>[[Visit my <a href="${scholar}">Google Scholar</a> and <a href="${orcid}">ORCID</a> profiles for the complete list. To date: <strong>11 journal papers (7 Q1)</strong> in IEEE venues and one IEEE conference (rank B).||Xem <a href="${scholar}">Google Scholar</a> và <a href="${orcid}">ORCID</a> để có danh sách đầy đủ. Đến nay: <strong>11 bài báo tạp chí (7 Q1)</strong> trên các tạp chí IEEE và một báo cáo hội nghị IEEE (hạng B).]]</p>
</div>
<p class="profile-row"><span class="row-label">[[Academic Profiles||Hồ sơ học thuật]]</span><a href="${scholar}">Google Scholar</a><a href="${orcid}">ORCID</a><a href="${profile('scopus')}">Scopus</a></p>
<ol class="cite-list">
  ${PUBS.map((p, i) => `<li class="cite"><p class="cite-num">${String(i + 1).padStart(2, '0')}</p><div><p>${p.q1 ? '<span class="tag tag--accent">Q1</span> ' : ''}${p.cite}${p.impact ? ` <span class="cite-if">(IF ${p.impact})</span>` : ''}</p><p class="link-row"><a class="doc-link" href="/${p.pdf}">PDF ↓</a></p></div></li>`).join('\n  ')}
</ol>
<div class="prose">
  <p>[[As a <strong>regular reviewer</strong> for journals including <i>IEEE TDSC, IEEE Networking Letters, IEEE Internet of Things Journal, IEEE Open Journal of the Computer Society, IET Networks</i>, and EAI TRIDENTCOM 2021, I regularly review current research in network technologies and IoT security.||Là <strong>phản biện thường xuyên</strong> cho các tạp chí gồm <i>IEEE TDSC, IEEE Networking Letters, IEEE Internet of Things Journal, IEEE Open Journal of the Computer Society, IET Networks</i> và hội nghị EAI TRIDENTCOM 2021, tôi thường xuyên phản biện các nghiên cứu mới về công nghệ mạng và bảo mật IoT.]]</p>
</div>`,
});

/* ----------------------------------------------------------- 08 Leadership */

const LEAD = [
  ['NCBT', '[[Head of the Southern Regional Representative Office &amp; Head of Innovation||Trưởng Văn phòng Đại diện khu vực phía Nam, kiêm Lãnh đạo Đổi mới Sáng tạo]]',
    '[[Leading the Southern Regional Representative Office and innovation at the National Center for Barcode and Traceability (NCBT), with a focus on technologies for national digital infrastructure: barcode, national traceability, electronic label and digital product passport.||Phụ trách Văn phòng Đại diện khu vực phía Nam và đổi mới sáng tạo tại Trung tâm Mã số Mã vạch Truy xuất Nguồn gốc Quốc gia (NCBT), tập trung vào các công nghệ cho hạ tầng số quốc gia: mã số mã vạch, truy xuất nguồn gốc, nhãn điện tử và hộ chiếu số sản phẩm.]]'],
  ['IDT / VUSTA', '[[President, Scientific Council||Chủ tịch Hội đồng Khoa học]]',
    '[[Supporting research strategy and scientific coordination for digital transformation at the <a href="https://idt.org.vn/gioi-thieu/co-cau-to-chuc-va-ban-lanh-dao">Institute of Digital Transformation Research &amp; Application (IDT)</a> under VUSTA.||Tham gia định hướng chiến lược nghiên cứu và điều phối khoa học cho chuyển đổi số tại <a href="https://idt.org.vn/gioi-thieu/co-cau-to-chuc-va-ban-lanh-dao">Viện Nghiên cứu Ứng dụng và Chuyển đổi số (IDT)</a> thuộc VUSTA.]]',
    '/president-idt.jpg'],
  ['NCA', '[[Member||Thành viên]]',
    '[[Contributing to policy development and national cyber-defense frameworks through the <a href="https://www.nca.org.vn/home?l=vi">National Cybersecurity Association (NCA)</a>.||Tham gia phát triển chính sách và khung phòng thủ an ninh mạng quốc gia tại <a href="https://www.nca.org.vn/home?l=vi">Hiệp hội An ninh mạng Quốc gia (NCA)</a>.]]',
    '/nca.jpg'],
  ['DDC', '[[CEO||Tổng Giám đốc]]',
    '[[Leading work on digital transformation and data solutions for enterprise and public-sector clients at <a href="https://sohoadulieu.org">Data Digitization Company (DDC)</a>.||Phụ trách các hoạt động chuyển đổi số và giải pháp dữ liệu cho doanh nghiệp và khu vực công tại <a href="https://sohoadulieu.org">Công ty Số hóa Dữ liệu (DDC)</a>.]]'],
  ['VCyber Technology', '[[Senior Advisor||Cố vấn cấp cao]]',
    '[[Advising <a href="https://vcyber.vn/">VCyber Technology</a> on software &amp; cybersecurity solutions for enterprise digital transformation. Flagship products: a traceability and electronic label application, OKI secure messaging and OKA secure storage.||Cố vấn cho <a href="https://vcyber.vn/">VCyber Technology</a> về giải pháp phần mềm và an ninh mạng phục vụ chuyển đổi số doanh nghiệp. Sản phẩm chủ lực gồm ứng dụng truy xuất nguồn gốc và nhãn điện tử, nhắn tin an toàn OKI và lưu trữ an toàn OKA.]]'],
  ['Fanvity', '[[Technical Advisor||Cố vấn Kỹ thuật]]',
    '[[Technical advice to <a href="https://fanvity.com">Fanvity</a>, an enterprise digital-transformation platform focused on National Traceability solutions.||Cố vấn cho <a href="https://fanvity.com">Fanvity</a>, nền tảng chuyển đổi số doanh nghiệp tập trung vào các giải pháp Truy xuất Nguồn gốc Quốc gia.]]'],
  ['VLabel', '[[CTO||Giám đốc Kỹ thuật]]',
    '[[<a href="https://vlabel.vn">VLabel</a>, a national platform for electronic labels and traceability solutions.||<a href="https://vlabel.vn">VLabel</a>, nền tảng quốc gia về nhãn điện tử và các giải pháp truy xuất nguồn gốc.]]'],
  ['VShare', '[[CTO||Giám đốc Kỹ thuật]]',
    '[[<a href="https://vshare.vn">VShare</a>, an enterprise platform that consolidates distributed organizational data into a unified on-premise environment for analytics, reporting and AI applications.||<a href="https://vshare.vn">VShare</a>, nền tảng doanh nghiệp tập hợp dữ liệu phân tán của tổ chức vào một môi trường on-premise thống nhất, phục vụ phân tích, báo cáo và ứng dụng AI.]]'],
  ['Samanta Technology', '[[CTO||Giám đốc Kỹ thuật]]',
    '[[<a href="https://samanta.com.vn/about">Samanta Technology</a>, a technology and digital-transformation company developing technology products in Vietnam.||<a href="https://samanta.com.vn/about">Samanta Technology</a>, công ty công nghệ và chuyển đổi số phát triển các sản phẩm công nghệ tại Việt Nam.]]'],
  ['Viriya', '[[CTO||Giám đốc Kỹ thuật]]',
    '[[<a href="https://viriya.com.vn">Viriya Company</a>, a company working in technology, digital transformation and AI applications in Vietnam.||<a href="https://viriya.com.vn">Công ty Công nghệ Viriya</a>, đơn vị hoạt động trong lĩnh vực công nghệ, chuyển đổi số và ứng dụng AI tại Việt Nam.]]'],
  ['trinhminhduc.com', '[[Technical Architect||Kiến trúc sư Kỹ thuật]]',
    '[[Technical architecture for <a href="https://trinhminhduc.com">trinhminhduc.com</a>, an online education platform.||Kiến trúc kỹ thuật cho <a href="https://trinhminhduc.com">trinhminhduc.com</a>, nền tảng giáo dục trực tuyến.]]'],
];

const leadership = section({
  id: 'leadership', title: '[[Leadership &amp; Affiliations||Lãnh đạo &amp; Liên kết]]', tone: 'ivory',
  lede: '[[Roles connecting academia, industry and the public sector.||Các vai trò kết nối học thuật, doanh nghiệp và khu vực công.]]',
  body: `
<ul class="role-list">
  ${LEAD.map(([org, role, text, info]) => `<li class="role"><p class="role-kind">${org}</p><h3 class="item-title">${role}</h3><p>${text}${info ? ` <a href="${info}">[[Info ↗||Thông tin ↗]]</a>` : ''}</p></li>`).join('\n  ')}
</ul>`,
});

/* ----------------------------------------------------------- 09 Mentorship */

const mentorship = section({
  id: 'mentorship', title: '[[Mentorship||Hướng dẫn Sinh viên]]',
  lede: '[[Supporting the development of the next generation of researchers through practical research experience.||Hỗ trợ thế hệ nhà nghiên cứu tiếp theo phát triển thông qua trải nghiệm nghiên cứu thực tế.]]',
  body: `
<div class="prose prose--lead">
  <p>[[Mentoring higher-degree research students is an important part of my academic work. I currently mentor students at <a href="${VCL}">VCyber Lab</a> and VinUniversity.||Hướng dẫn học viên và nghiên cứu sinh là một phần quan trọng trong công việc học thuật của tôi. Hiện tôi đang hướng dẫn sinh viên tại <a href="${VCL}">VCyber Lab</a> và VinUniversity.]]</p>
</div>
<ul class="rows rows--prose">
  <li>[[At <a href="${VCL}">VCyber Lab</a> I have mentored <strong><a href="https://www.vcyber.work/people">two master's graduates, two current master's students, and four bachelor's students</a></strong> through research in <em>PQC, AI-driven cybersecurity, and IoT &amp; robotic security</em>, helping them refine research questions, work through academic challenges, and turn technical skills into collaborative research outputs.||Tại <a href="${VCL}">VCyber Lab</a>, tôi đã hướng dẫn <strong><a href="https://www.vcyber.work/people">hai thạc sĩ đã tốt nghiệp, hai học viên cao học hiện tại và bốn sinh viên đại học</a></strong> qua các nghiên cứu về <em>PQC, an ninh mạng ứng dụng AI, và bảo mật IoT và robot</em>: hỗ trợ các bạn hoàn thiện câu hỏi nghiên cứu, xử lý những thách thức học thuật và chuyển năng lực kỹ thuật thành các kết quả nghiên cứu chung.]]</li>
  <li>[[At Deakin University I guided a new student (Mr. Gurpreet Singh) under <a href="https://experts.deakin.edu.au/12600-keshav-sood">Dr. Keshav Sood</a>. Through weekly meetings, we refined his research questions and produced a <a href="https://ieeexplore.ieee.org/document/10492991">joint publication</a>, providing practical experience in supervising HDR candidates.||Tại Đại học Deakin, tôi hướng dẫn một nghiên cứu sinh mới (anh Gurpreet Singh) dưới sự hướng dẫn chính của <a href="https://experts.deakin.edu.au/12600-keshav-sood">TS. Keshav Sood</a>. Qua các buổi họp hằng tuần, chúng tôi cùng hoàn thiện câu hỏi nghiên cứu và có một <a href="https://ieeexplore.ieee.org/document/10492991">công bố chung</a>, qua đó tích lũy thêm kinh nghiệm thực tế trong hướng dẫn nghiên cứu sinh HDR.]]</li>
  <li>[[During my postdoctoral period, I supported a master's student, Mr. Michael, under the supervision of Dr. Sood, including the writing and revision of a book chapter preliminarily accepted for publication by <em>Elsevier (Scopus)</em>.||Trong thời gian sau tiến sĩ, tôi hỗ trợ học viên cao học Michael dưới sự hướng dẫn chính của TS. Sood, bao gồm việc viết và biên tập một chương sách đã được chấp nhận sơ bộ để xuất bản bởi <em>Elsevier (Scopus)</em>.]]</li>
</ul>`,
});

/* -------------------------------------------------------- 10 Collaboration */

const collaboration = section({
  id: 'collaboration', title: '[[Research Collaboration||Hợp tác nghiên cứu]]', tone: 'ivory',
  lede: '[[Research collaboration across institutions and disciplines.||Hợp tác nghiên cứu giữa nhiều đơn vị và lĩnh vực.]]',
  body: `
<ul class="pill-list">
  <li>[[Cybersecurity &amp; AI||An ninh mạng &amp; AI]]</li><li>IoT</li><li>[[Robotics||Robot]]</li><li>[[Post-Quantum Cryptography||Mật mã hậu lượng tử]]</li><li>[[External Grant · Dept. of Defence||Tài trợ bên ngoài · Bộ Quốc phòng Úc]]</li>
</ul>
<div class="prose">
  <p>[[At VinUni I collaborate with <a href="https://andrew-dungle.github.io/">Prof. Andrew</a> on cybersecurity and AI, and with <a href="https://vinuni.edu.vn/vi/people/ts-nguyen-van-dinh/">Prof. Dinh</a> and <a href="https://scholar.google.com/citations?hl=en&amp;user=U0wdH2oAAAAJ">Prof. Long</a> on IoT. For robotics I work with Prof. Long, <a href="https://vinuni.edu.vn/people/thai-mai-thanh-phd-2/">Prof. Thanh</a> and <a href="https://vinuni.edu.vn/people/do-tho-truong/">Prof. Truong</a>, and with <a href="https://experts.deakin.edu.au/53344-syed-wajid-ali-shah">Dr. Syed</a> on post-quantum cryptography. Beyond VinUni, I am working closely with <a href="https://experts.deakin.edu.au/12600-keshav-sood">Dr. Keshav Sood</a> as co-lead on an external grant application to the Department of Defence.||Tại VinUni, tôi hợp tác với <a href="https://andrew-dungle.github.io/">GS. Andrew</a> về an ninh mạng và AI, cùng <a href="https://vinuni.edu.vn/vi/people/ts-nguyen-van-dinh/">GS. Dinh</a> và <a href="https://scholar.google.com/citations?hl=en&amp;user=U0wdH2oAAAAJ">GS. Long</a> về IoT. Về robot, tôi làm việc cùng GS. Long, <a href="https://vinuni.edu.vn/people/thai-mai-thanh-phd-2/">GS. Thanh</a> và <a href="https://vinuni.edu.vn/people/do-tho-truong/">GS. Truong</a>, và cùng <a href="https://experts.deakin.edu.au/53344-syed-wajid-ali-shah">TS. Syed</a> về mật mã hậu lượng tử. Ngoài VinUni, tôi phối hợp chặt chẽ với <a href="https://experts.deakin.edu.au/12600-keshav-sood">TS. Keshav Sood</a> trong vai trò đồng chủ trì một hồ sơ xin tài trợ gửi Bộ Quốc phòng.]]</p>
  <p>[[These experiences have helped me better understand how research funding is developed for critical technologies. They also provide a foundation for pursuing future grants and industry partnerships in cybersecurity, AI and post-quantum cryptography.||Những trải nghiệm này giúp tôi hiểu rõ hơn về quá trình xây dựng và huy động nguồn tài trợ cho các công nghệ trọng yếu. Đây cũng là nền tảng để tôi tiếp tục theo đuổi các nguồn tài trợ và hợp tác doanh nghiệp trong an ninh mạng, AI và mật mã hậu lượng tử.]]</p>
</div>`,
});

/* --------------------------------------------------------- 11 Work together */

const work = section({
  id: 'work', title: '[[Working With Me||Cơ hội Hợp tác]]',
  lede: '[[Opportunities to work together on secure and intelligent technologies.||Cơ hội cùng hợp tác trong các công nghệ an toàn và thông minh.]]',
  body: `
<div class="prose prose--lead">
  <p>[[We are recruiting <strong>Research Assistants, Ph.D. students, Master's students, and Postdoctoral researchers</strong> to join research projects in cybersecurity, AI and smart sensing. Current research directions:||Chúng tôi đang tuyển <strong>Trợ lý Nghiên cứu, nghiên cứu sinh Tiến sĩ, học viên Thạc sĩ và Nghiên cứu viên Sau Tiến sĩ</strong> cho các dự án nghiên cứu về an ninh mạng, AI và cảm biến thông minh. Các hướng nghiên cứu hiện tại:]]</p>
</div>
<ul class="direction-grid">
  <li>[[Smart, Low-Cost Air-Quality Monitoring for Urban Environments||Giám sát chất lượng không khí thông minh, chi phí thấp cho đô thị]]</li>
  <li><a href="/Research_assistant_JD.pdf">[[Post-Quantum Cryptography (PQC)||Mật mã hậu lượng tử (PQC)]]</a></li>
  <li>[[Applied AI in Cybersecurity||AI ứng dụng trong An ninh mạng]]</li>
  <li>[[Anomaly Detection &amp; Threat Intelligence||Phát hiện bất thường &amp; Tình báo mối đe dọa]]</li>
  <li>[[IoT &amp; Embedded Device Security||Bảo mật IoT &amp; Thiết bị nhúng]]</li>
  <li>[[Cybersecurity for Robotics &amp; Autonomous Systems||An ninh mạng cho Robot &amp; Hệ tự hành]]</li>
</ul>
<div class="prose">
  <p>[[Applicants with a strong technical background and an interest in deep-tech research and practical impact are welcome to apply.||Chúng tôi chào đón các ứng viên có nền tảng kỹ thuật tốt, quan tâm đến nghiên cứu deep-tech và mong muốn tạo ra giá trị thực tiễn.]]</p>
</div>
<div class="actions">
  <a class="btn" href="/JD_AirQC_VinUni.pdf">[[View open positions||Xem vị trí tuyển dụng]] <span aria-hidden="true">→</span></a>
  <a class="btn btn--ghost" href="mailto:${EMAIL.academic}">[[Email me||Gửi email]]</a>
</div>`,
});

/* ----------------------------------------------------------- 12 References */

const REFS = [
  ['KS', '[[Dr.||TS.]] Keshav Sood', 'https://experts.deakin.edu.au/12600-keshav-sood', '[[Senior Lecturer · Deakin University||Giảng viên Cao cấp · ĐH Deakin]]', '+61 3 924 45519', 'keshav.sood@deakin.edu.au'],
  ['YX', '[[Prof.||GS.]] Yong Xiang', 'https://experts.deakin.edu.au/706-yong-xiang', '[[Professor of Network Engineering · Deakin||Giáo sư Kỹ thuật Mạng · Deakin]]', '+61 3 925 17740', 'yong.xiang@deakin.edu.au'],
  ['LP', '[[Assoc. Prof.||PGS.]] Lei Pan', 'https://experts.deakin.edu.au/28771-lei-pan', '[[Associate Professor · Deakin University||Phó Giáo sư · ĐH Deakin]]', '+61 3 925 17483', 'l.pan@deakin.edu.au'],
  ['LE', '[[Prof.||GS.]] Laurent El Ghaoui', null, '[[Vice Provost of Research &amp; Innovation · Dean, College of Engineering &amp; Computer Science · VinUniversity||Phó Hiệu trưởng phụ trách Nghiên cứu &amp; Đổi mới · Trưởng khoa Kỹ thuật &amp; Khoa học Máy tính · VinUniversity]]', null, 'laurent.eg@vinuni.edu.vn'],
  ['SY', '[[Prof.||GS.]] Shui Yu', null, '[[Deputy Chair, UTS Research Committee · University of Technology Sydney||Phó Chủ tịch Hội đồng Nghiên cứu UTS · Đại học Công nghệ Sydney (UTS)]]', '+61 2 9514 1837', 'Shui.Yu@uts.edu.au'],
  ['PN', '[[Prof.||GS.]] Pham Ngoc Nam', null, '[[Vice Dean · Director, Electrical Engineering Program · College of Engineering &amp; Computer Science · VinUniversity||Phó Trưởng khoa · Giám đốc Chương trình Kỹ thuật Điện · Khoa Kỹ thuật &amp; Khoa học Máy tính · VinUniversity]]', null, 'nam.pn@vinuni.edu.vn'],
];

const references = section({
  id: 'references', title: '[[References||Người giới thiệu]]', tone: 'ivory',
  lede: '[[Academic references from senior scholars and university leaders.||Thông tin người giới thiệu gồm các học giả và lãnh đạo đại học giàu kinh nghiệm.]]',
  body: `
<ul class="ref-grid">
  ${REFS.map(([ini, name, url, role, phone, email]) => `<li class="ref">
    <p class="ref-initials" aria-hidden="true">${ini}</p>
    <div>
      <h3 class="ref-name">${url ? `<a href="${url}">${name}</a>` : name}</h3>
      <p class="ref-role">${role}</p>
      <p class="ref-contact">${phone ? `<a href="tel:${phone.replaceAll(' ', '')}">☎ ${phone}</a><br>` : ''}<a href="mailto:${email}">✉ ${email}</a></p>
    </div>
  </li>`).join('\n  ')}
</ul>
<p class="closing">[[Thank you for visiting my website.||Cảm ơn bạn đã ghé thăm trang cá nhân của tôi.]]</p>`,
});

export const body = (lang) => [hero(lang), biography, education, awards, experience, teaching, interests, publications, leadership, mentorship, collaboration, work, references].join('\n');
