import { Question } from './types';

export const questions2: Question[] = [
  // --- Category: Accuracy (Tính Chính xác của Câu lệnh) ---
  {
    id: 'a1', category: 'accuracy', type: 'single',
    text: 'Kỹ thuật Đảo ngược câu lệnh (Reverse Prompting) là gì?',
    options: [
      'Nhập vào AI toàn những dữ liệu mang ý nghĩa tiêu cực.',
      'Dùng kết quả AI tạo ra để đoán lại câu hỏi gốc ban đầu.',
      'Dịch văn bản từ dưới lên trên.',
      'Xóa kết quả của AI.'
    ],
    correctAnswer: 'Dùng kết quả AI tạo ra để đoán lại câu hỏi gốc ban đầu.',
    explanation: 'Reverse prompting dùng kết quả (output) để truy ngược ra cấu trúc (prompt) tối ưu nhằm thiết kế prompt tốt hơn.'
  },
  {
    id: 'a2', category: 'accuracy', type: 'multiple',
    text: 'Làm thế nào một nhà nghiên cứu có thể xác minh các sự kiện tạo ra bởi AI là chính xác? (Chọn 2)',
    options: ['Sử dụng các trang web kiểm tra thực tế (fact-check).', 'Tham chiếu chéo với các nguồn đáng tin cậy độc lập.', 'Chạy lại câu lệnh AI 10 lần và xem số đông.', 'Tin tưởng tuyệt đối vì AI đã được kiểm duyệt.'],
    correctAnswers: ['Sử dụng các trang web kiểm tra thực tế (fact-check).', 'Tham chiếu chéo với các nguồn đáng tin cậy độc lập.'],
    explanation: 'AI có thể duy trì sự ảo giác ổn định qua nhiều lần chạy, do đó luôn phải kiểm chứng với nguồn ngoài AI.'
  },
  {
    id: 'a3', category: 'accuracy', type: 'match',
    text: 'Xác định các dạng "lỗi" đầu ra của mô hình AI tạo sinh.',
    pairs: [
      { left: 'Ảo giác (Hallucination)', right: 'Mô hình tự tạo ra các thông tin hoàn toàn giả mạo nhưng nói rất thuyết phục.' },
      { left: 'Thiên lệch (Bias)', right: 'Mô hình thiên vị, bất bình đẳng đối với một nhóm nhất định do dữ liệu.' },
      { left: 'Lỗi logic toán học', right: 'Mô hình suy luận các bài toán số học sai do bản chất mô hình ngôn ngữ.' }
    ],
    explanation: 'Ảo giác, Bias và lỗi luận lý là những khuyết điểm mang rủi ro cốt lõi cần phải kiểm chứng.'
  },
  {
    id: 'a4', category: 'accuracy', type: 'fill',
    text: 'Kỹ thuật ',
    chunks: ['', ' (Tinh chỉnh lặp lại) giúp nâng cao tính chính xác bằng cách ', ' liên tục với mô hình.'],
    blanks: [
      { options: ['Iterative refinement', 'Zero-shot', 'Decomposition'], correctAnswer: 'Iterative refinement' },
      { options: ['Sửa đổi và đưa ra phản hồi', 'Xóa lịch sử trò chuyện', 'Tải lại trang web'], correctAnswer: 'Sửa đổi và đưa ra phản hồi' }
    ],
    explanation: 'Iterative Refinement đòi hỏi người dùng feedback liên tục để AI từ từ thu hẹp và sửa lỗi trong phiên bản sinh ra tiếp theo.'
  },
  {
    id: 'a5', category: 'accuracy', type: 'single',
    text: 'Tại sao việc thiết lập "Temperature" (nhiệt độ) của mô hình bằng 0 lại hữu ích trong các tác vụ lập trình (coding)?',
    options: ['Để tăng tính sáng tạo và bay bổng.', 'Để buộc LLM đưa ra câu trả lời mang tính tất định (chính xác, ít biến đổi) nhất có thể.', 'Để AI chạy mát hơn.', 'Để AI vẽ ra hình ảnh.'],
    correctAnswer: 'Để buộc LLM đưa ra câu trả lời mang tính tất định (chính xác, ít biến đổi) nhất có thể.',
    explanation: 'Temperature = 0 loại bỏ sự ngẫu nhiên, giúp mã lập trình nhất quán và tránh "sáng tạo" ra các hàm không tồn tại.'
  },
  {
    id: 'a6', category: 'accuracy', type: 'multiple',
    text: 'Khi AI tạo ra số liệu thống kê hoặc nghiên cứu giả mạo, nguyên nhân có thể do đâu? (Chọn 2)',
    options: ['Do hiệu ứng Ảo giác (Hallucination) từ mô hình dự đoán từ tiếp theo.', 'Do người dùng không cung cấp đủ ngữ cảnh tham chiếu (Grounding).', 'Do người dùng không dùng ChatGPT.', 'Do thiếu mạng internet.'],
    correctAnswers: ['Do hiệu ứng Ảo giác (Hallucination) từ mô hình dự đoán từ tiếp theo.', 'Do người dùng không cung cấp đủ ngữ cảnh tham chiếu (Grounding).'],
    explanation: 'Bản chất của thuật toán thống kê từ học sâu dễ dẫn đến Hallucination nếu không có dữ liệu chốt (Ground).'
  },
  {
    id: 'a7', category: 'accuracy', type: 'single',
    text: 'Các nền tảng LLM lớn đều có nút "Tái tạo" (Regenerate). Công dụng đối với độ chính xác là gì?',
    options: ['Trải nghiệm một biểu đồ xác suất khác để tìm ra hướng phản hồi tối ưu hơn khi AI bị lạc đề.', 'Tăng gấp đôi sự thật.', 'Kiểm tra xem AI có bị virus không.', 'Tính toán lại giới hạn token.'],
    correctAnswer: 'Trải nghiệm một biểu đồ xác suất khác để tìm ra hướng phản hồi tối ưu hơn khi AI bị lạc đề.',
    explanation: 'Regenerate cung cấp một Sampling mới, cho phép thoát khỏi hố sâu lỗi logic của luồng cũ.'
  },
  {
    id: 'a8', category: 'accuracy', type: 'match',
    text: 'Nối các khái niệm trong độ chuẩn xác với hướng dẫn ứng xử:',
    pairs: [
      { left: 'Dữ liệu không đáng tin (Unreliable output)', right: 'Luôn phải có human-in-the-loop (con người giám sát).' },
      { left: 'Bối cảnh (Context) mơ hồ', right: 'Bổ sung ngay hồ sơ nền hoặc bảng tiêu chuẩn vào câu lệnh.' },
      { left: 'Vượt quá giới hạn token (Token limit)', right: 'Mô hình sẽ quên hoặc cắt ngắn kết quả, cần chia nhỏ prompt.' }
    ]
  },
  // --- Category: Ethics (Tác động Đạo đức, Xã hội, Pháp lý) ---
  {
    id: 'e1', category: 'ethics', type: 'multiple',
    text: 'Sự thiên lệch (Bias) trong mô hình AI thường xuất phát từ những thông tin nào trong dữ liệu huấn luyện? (Chọn 2)',
    options: ['Dữ liệu mất cân bằng về Giới tính.', 'Dữ liệu phân mảnh về Chủng tộc và Khu vực hành chính.', 'Kết nối wifi.', 'Thẻ CPU.'],
    correctAnswers: ['Dữ liệu mất cân bằng về Giới tính.', 'Dữ liệu phân mảnh về Chủng tộc và Khu vực hành chính.'],
    explanation: 'Mọi dữ liệu sinh thái do con người sản xuất đều chứa cấu trúc định kiến, AI sẽ khuếch đại vấn đề đó.'
  },
  {
    id: 'e2', category: 'ethics', type: 'single',
    text: 'Công ty của bạn xử lý Dữ liệu định danh cá nhân (PII) như tên, email khách hàng. Quyết định nào là an toàn khi dùng LLM công cộng?',
    options: ['Ẩn danh hóa (Che dấu hoặc thay bằng Token) dữ liệu PII trước khi đưa vào mô hình.', 'Tải toàn bộ file Excel lên vì các mô hình tự biết bảo mật.', 'Chia sẻ mật khẩu.', 'Tuyệt đối không dùng AI dưới mọi hình thức.'],
    correctAnswer: 'Ẩn danh hóa (Che dấu hoặc thay bằng Token) dữ liệu PII trước khi đưa vào mô hình.',
    explanation: 'Việc đẩy PII lên Gen AI public là vi phạm nghiêm trọng GDPR/Luật bảo vệ dữ liệu. Cải tiến prompt bằng cách Redact (Xóa) hoặc giả danh.'
  },
  {
    id: 'e3', category: 'ethics', type: 'match',
    text: 'Ghép nối các hệ quả xã hội với biểu hiện của nó trong AI tạo sinh:',
    pairs: [
      { left: 'Deepfake (Giả mạo sâu)', right: 'Ghép khuôn mặt, giọng nói để lừa đảo hoặc bôi nhọ người khác.' },
      { left: 'Vi phạm bản quyền', right: 'Mô hình tự động tái tạo khối lượng lớn các tác phẩm nghệ thuật, mã nguồn đã được bảo hộ.' },
      { left: 'Rò rỉ bí mật thương mại', right: 'Nhân viên đưa mã nguồn nội bộ lên web AI để sửa lỗi.' }
    ],
    explanation: 'Ba rủi ro pháp lý lớn nhất tác động vào tổ chức.'
  },
  {
    id: 'e4', category: 'ethics', type: 'single',
    text: 'Sự giám sát của con người (Human Oversight) trong vòng lặp vận hành AI đóng vai trò gì?',
    options: ['Tránh lan truyền thông tin sai lệch, hậu quả tài chính và pháp lý.', 'Thay thế con người nhập dữ liệu.', 'Giúp máy tính không bị quá nóng.', 'Nâng cao doanh số ngay lập tức.'],
    correctAnswer: 'Tránh lan truyền thông tin sai lệch, hậu quả tài chính và pháp lý.',
    explanation: 'Tổ chức phải chịu trách nhiệm pháp luật cho các sản phẩm đầu ra, do đó Human-in-the-loop là bắt buộc.'
  },
  {
    id: 'e5', category: 'ethics', type: 'multiple',
    text: 'Công cụ AI tạo sinh nào đang bị lạm dụng để tạo Deepfake? (Chọn 2)',
    options: ['Mô hình hoán đổi khuôn mặt tự động hóa (Face Swap)', 'Mô hình nhái giọng nói (Voice Clone)', 'Phần mềm Excel', 'Phần mềm kiểm tra ngữ pháp'],
    correctAnswers: ['Mô hình hoán đổi khuôn mặt tự động hóa (Face Swap)', 'Mô hình nhái giọng nói (Voice Clone)'],
    explanation: 'Deepfake là tổ hợp của Synthetic Image và Voice generation để tạo ra phương tiện giả dối.'
  },
  {
    id: 'e6', category: 'ethics', type: 'fill',
    text: 'Khi chia sẻ dữ liệu kinh doanh quan trọng, tổ chức nên thiết lập ',
    chunks: ['', ' nội bộ nhằm cấm việc chia sẻ nội dung gốc với các ', '.'],
    blanks: [
      { options: ['Quy định bảo mật', 'Bảng tính', 'Mã độc'], correctAnswer: 'Quy định bảo mật' },
      { options: ['mô hình AI công khai', 'nhà cung cấp đám mây', 'nhân viên mới'], correctAnswer: 'mô hình AI công khai' }
    ],
    explanation: 'Lỗ hổng từ người dùng (user error) là nguyên nhân chính rò rỉ dữ liệu khi làm việc với AI public.'
  },
  {
    id: 'e7', category: 'ethics', type: 'match',
    text: 'Xác định trách nhiệm sử dụng AI tạo sinh.',
    pairs: [
      { left: 'Minh bạch', right: 'Tiết lộ rõ với khán giả hoặc đối tác rằng nội dung có sự can thiệp của AI.' },
      { left: 'Bảo vệ sở hữu trí tuệ', right: 'Kiểm tra các hình ảnh sinh ra có đạo nhái các nhãn hiệu hay nhân vật đã đăng ký hay không.' },
      { left: 'Bảo vệ quyền riêng tư', right: 'Tránh nhập các đoạn hội thoại tư vấn y khoa thực tế của bệnh nhân vào AI.' }
    ]
  },
  {
    id: 'e8', category: 'ethics', type: 'single',
    text: 'Hành vi nào dễ dẫn đến hậu quả hình sự và dân sự khi khai thác AI tạo sinh?',
    options: ['Dùng AI tóm tắt bài báo để học cá nhân.', 'Dùng Deepfake để thực hiện việc lừa đảo tài chính hoặc xúc phạm nhân phẩm.', 'Dùng AI tạo lịch học lý tưởng.', 'Yêu cầu AI viết thư xin việc.'],
    correctAnswer: 'Dùng Deepfake để thực hiện việc lừa đảo tài chính hoặc xúc phạm nhân phẩm.',
    explanation: 'Sử dụng AI cho mục đích lừa đảo, giả mạo danh tính sẽ đối mặt với pháp luật.'
  },
  {
    id: 'e9', category: 'ethics', type: 'multiple',
    text: 'Điều nào là hiểu lầm (Myth) phổ biến về AI tạo sinh? (Chọn 2)',
    options: ['AI sẽ thay thế hoàn toàn giao tiếp của con người.', 'AI được mọi người trên thế giới tiếp cận chuyên sâu như nhau (Không có khoảng cách kĩ thuật số).', 'AI có khả năng hỗ trợ con người sáng tạo.', 'AI có thể xử lý tập dữ liệu lớn.'],
    correctAnswers: ['AI sẽ thay thế hoàn toàn giao tiếp của con người.', 'AI được mọi người trên thế giới tiếp cận chuyên sâu như nhau (Không có khoảng cách kĩ thuật số).'],
    explanation: 'Sự thật là AI không thể gánh vác toàn bộ thấu cảm và trách nhiệm, và thế giới vẫn tồn tại bất công số (digital divide) về trang thiết bị AI.'
  },
  {
    id: 'e10', category: 'ethics', type: 'single',
    text: 'Về vấn đề bản quyền dữ liệu (Copyright Data) để huấn luyện LLM:',
    options: ['Hiện luật đã có quy định rõ ràng tuyệt đối 100%.', 'Hàng loạt vụ kiện đang diễn ra giữa tác giả và các tập đoàn AI do họ lấy dữ liệu chưa xin phép.', 'Mô hình AI chỉ lấy dữ liệu được cấp phép gốc nguồn mở.', 'Các chính phủ cấm hoàn toàn.'],
    correctAnswer: 'Hàng loạt vụ kiện đang diễn ra giữa tác giả và các tập đoàn AI do họ lấy dữ liệu chưa xin phép.',
    explanation: 'Các tập đoàn thu thập lượng dữ liệu internet khổng lồ, bao gồm cả nội dung bản quyền (bài báo, sách) dẫn đến tranh cãi pháp lý lớn (như NYT vs OpenAI).'
  }
];
