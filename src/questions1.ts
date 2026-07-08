import { Question } from './types';

export const questions1: Question[] = [
  // --- Category: Methodology ---
  {
    id: 'm1', category: 'methodology', type: 'single',
    text: 'Đầu ra nào sau đây là kết quả của AI tạo sinh?',
    options: ['Phát hiện sự bất thường trong mô hình bán hàng.', 'Phân loại phản hồi tích cực/tiêu cực.', 'Một ngôi nhà được thêm vào bức ảnh sau khi mô tả.', 'Đếm số lượng nhân viên cần thiết.'],
    correctAnswer: 'Một ngôi nhà được thêm vào bức ảnh sau khi mô tả.',
    explanation: 'AI tạo sinh tạo nội dung mới (hình ảnh, văn bản, âm thanh) từ mô tả.'
  },
  {
    id: 'm2', category: 'methodology', type: 'match',
    text: 'Đối với mỗi tuyên bố liên quan đến LLM (Mô hình ngôn ngữ lớn), hãy xác định Đúng/Sai.',
    pairs: [
      { left: 'LLM có thể tự động hóa quy trình lặp đi lặp lại', right: 'Đúng' },
      { left: 'LLM được đào tạo trên các bộ dữ liệu khổng lồ', right: 'Đúng' },
      { left: 'LLM hoàn toàn dựa trên thực tế, không bao giờ sai', right: 'Sai' }
    ],
    explanation: 'LLM dự đoán dựa trên xác suất, do đó có thể tạo ra thông tin không có thật (ảo giác).'
  },
  {
    id: 'm3', category: 'methodology', type: 'single',
    text: 'Mô hình nào sau đây sử dụng lượng lớn dữ liệu huấn luyện để hình thành nội dung do AI tạo ra?',
    options: ['Mô hình Ngôn ngữ Lớn (LLM)', 'Biểu diễn Mã hóa Hai chiều (BERT)', 'OpenAI Codex', 'Mô hình phân loại truyền thống'],
    correctAnswer: 'Mô hình Ngôn ngữ Lớn (LLM)',
    explanation: 'LLMs sử dụng tập dữ liệu rất lớn để hiểu và sinh văn bản tự nhiên.'
  },
  {
    id: 'm4', category: 'methodology', type: 'multiple',
    text: 'Hai thông số phần cứng nào là quan trọng nhất trên một máy chủ để chạy/huấn luyện các mô hình AI tạo sinh hình ảnh? (Chọn 2)',
    options: ['GPU (Bộ xử lý đồ họa) mạnh mẽ', 'Nguồn điện (PSU) công suất lớn', 'Màn hình cảm ứng', 'Bàn phím cơ'],
    correctAnswers: ['GPU (Bộ xử lý đồ họa) mạnh mẽ', 'Nguồn điện (PSU) công suất lớn'],
    explanation: 'Huấn luyện AI hình ảnh đòi hỏi rất nhiều sức mạnh tính toán song song từ GPU, kéo theo yêu cầu nền tảng cung cấp năng lượng lớn.'
  },
  {
    id: 'm5', category: 'methodology', type: 'match',
    text: 'Ghép nối các hệ thống AI với mô hình tương ứng của nó.',
    pairs: [
      { left: 'Tạo văn bản', right: 'OpenAI GPT, Google Gemini, Anthropic Claude' },
      { left: 'Tạo hình ảnh', right: 'DALL-E, Adobe Firefly, Midjourney' },
      { left: 'Phân tích dữ liệu tĩnh', right: 'Machine Learning truyền thống' }
    ],
    explanation: 'GPT/Gemini thuộc LLM (văn bản). DALL-E/Firefly thuộc Diffusion models (hình ảnh).'
  },
  {
    id: 'm6', category: 'methodology', type: 'fill',
    text: 'Điền loại đầu vào/đầu ra tương ứng cho các nhánh AI tạo sinh:',
    chunks: ['1. Audio-to-Video: Đầu vào là ', ' và Đầu ra là ', '.\n2. Audio-to-Text: Đầu vào là ', ' và Đầu ra là ', '.'],
    blanks: [
      { options: ['Âm thanh', 'Văn bản', 'Hình ảnh', 'Video'], correctAnswer: 'Âm thanh' },
      { options: ['Âm thanh', 'Văn bản', 'Hình ảnh', 'Video'], correctAnswer: 'Video' },
      { options: ['Âm thanh', 'Văn bản', 'Hình ảnh', 'Video'], correctAnswer: 'Âm thanh' },
      { options: ['Âm thanh', 'Văn bản', 'Hình ảnh', 'Video'], correctAnswer: 'Văn bản' }
    ],
    explanation: 'Audio-to-video dùng giọng nói tạo hoạt ảnh khớp khẩu hình. Audio-to-text là chuyển giọng nói thành phụ đề.'
  },
  {
    id: 'm7', category: 'methodology', type: 'single',
    text: 'Đâu không phải là cấu trúc phổ biến của AI tạo sinh?',
    options: ['Mô hình khuếch tán (Diffusion)', 'Mô hình biến đổi (Transformer)', 'Mạng đối nghịch sinh (GANs)', 'Cơ sở dữ liệu đám mây (Cloud DB)'],
    correctAnswer: 'Cơ sở dữ liệu đám mây (Cloud DB)',
    explanation: 'Cloud DB là hạ tầng lưu trữ. Diffusion, Transformer và GANs mới là kiến trúc mô hình Generative AI.'
  },
  {
    id: 'm8', category: 'methodology', type: 'multiple',
    text: 'Dữ liệu đầu vào nào thường được hỗ trợ bởi các AI tạo sinh đa phương thức? (Chọn 2)',
    options: ['Văn bản', 'Hình ảnh', 'Câu lệnh SQL độc quyền', 'Linh kiện phần cứng'],
    correctAnswers: ['Văn bản', 'Hình ảnh'],
    explanation: 'AI đa phương thức (Multimodal) có thể hiểu văn bản, hình ảnh, âm thanh.'
  },
  {
    id: 'm9', category: 'methodology', type: 'single',
    text: 'Đâu là hậu quả của việc dữ liệu huấn luyện AI thay đổi hoặc lỗi thời quá nhanh?',
    options: ['Mô hình sẽ sinh ra các thông tin lỗi thời hoặc sai lệch.', 'Mô hình tự động cập nhật ngay lập tức không cần huấn luyện.', 'Mô hình sẽ ngừng hoạt động.', 'Mô hình sẽ tự động kết nối API của bên thứ 3.'],
    correctAnswer: 'Mô hình sẽ sinh ra các thông tin lỗi thời hoặc sai lệch.',
    explanation: 'Nếu dữ liệu huấn luyện bị lỗi thời (ví dụ như dữ liệu trước 2021), AI sẽ không biết thông tin hiện tại trừ khi có kỹ thuật truy xuất (RAG).'
  },
  {
    id: 'm10', category: 'methodology', type: 'fill',
    text: 'Giải thích ba kịch bản AI: \n',
    chunks: ['Hệ thống OCR quét ', ' để tạo ra ', '.\nKhi người dùng gõ "Tiếng Việt" và nhận bản dịch "English", hệ thống dùng ', ' sang ', '.'],
    blanks: [
      { options: ['Hình ảnh', 'Văn bản', 'Âm thanh'], correctAnswer: 'Hình ảnh' },
      { options: ['Hình ảnh', 'Văn bản', 'Âm thanh'], correctAnswer: 'Văn bản' },
      { options: ['Văn bản', 'Hình ảnh', 'Âm thanh'], correctAnswer: 'Văn bản' },
      { options: ['Văn bản', 'Hình ảnh', 'Âm thanh'], correctAnswer: 'Văn bản' }
    ]
  },
  // --- Category: Prompting Basics ---
  {
    id: 'p1', category: 'prompting_basics', type: 'match',
    text: 'Ghép nối kỹ thuật prompting với ví dụ tương ứng:',
    pairs: [
      { left: 'Zero-shot', right: 'Viết mã ngẫu nhiên.' },
      { left: 'One-shot', right: 'Viết mã ngẫu nhiên từ 1 đến 10.' },
      { left: 'Few-shot', right: 'Viết mã ngẫu nhiên, ví dụ: 5, 8, 11.' }
    ],
    explanation: 'Zero là không ví dụ. One là 1 ví dụ/ranh giới. Few là kèm vài ví dụ context.'
  },
  {
    id: 'p2', category: 'prompting_basics', type: 'single',
    text: 'Phương pháp nào chia nhỏ một nhiệm vụ phức tạp thành nhiều lời nhắc nhỏ gọn, tuần tự?',
    options: ['Chain-of-thought (Tư duy chuỗi)', 'Decomposition (Phân tách)', 'Zero-shot', 'Iterative refinement (Tinh chỉnh lặp lại)'],
    correctAnswer: 'Decomposition (Phân tách)',
    explanation: 'Decomposition là kỹ thuật phân tách bài toán lớn thành các bước/truy vấn nhỏ dễ giải quyết hơn.'
  },
  {
    id: 'p3', category: 'prompting_basics', type: 'multiple',
    text: 'Để tạo một bức ảnh phong cách cổ điển nhờ AI, bạn nên dùng những thông tin nào trong câu lệnh? (Chọn 2)',
    options: ['Mô tả nội dung chính của bức ảnh (nhà, cây, người).', 'Chỉ định phong cách (vintage, ảnh đen trắng, năm 1800).', 'Gõ các dòng mã hợp ngữ.', 'Đưa chi tiết kỹ thuật về RAM.'],
    correctAnswers: ['Mô tả nội dung chính của bức ảnh (nhà, cây, người).', 'Chỉ định phong cách (vintage, ảnh đen trắng, năm 1800).'],
    explanation: 'Một prompt ảnh tốt cần Content (nội dung) và Style (phong cách).'
  },
  {
    id: 'p4', category: 'prompting_basics', type: 'single',
    text: 'Bạn đang biên tập ngữ pháp và muốn tạo cảm giác giống một biên tập viên chuyên nghiệp. Yếu tố nào sau đây nên thêm vào prompt để đạt hiệu quả cao nhất?',
    options: ['Độ dài tối đa 100 chữ', 'Gán một Vai trò/Nhân cách (Persona) cho AI', 'Sử dụng ngôn ngữ ký hiệu', 'Mã hóa đầu vào'],
    correctAnswer: 'Gán một Vai trò/Nhân cách (Persona) cho AI',
    explanation: 'Gán "Persona" (ví dụ: Hãy đóng vai một biên tập viên báo chí chuyên nghiệp) định hình lại toàn bộ phong cách và tông giọng của AI.'
  },
  {
    id: 'p5', category: 'prompting_basics', type: 'match',
    text: 'Ghép từng kỹ thuật cải tiến câu lệnh với ví dụ:',
    pairs: [
      { left: 'Nội dung (Content)', right: 'Mô tả cụ thể và rõ ràng các yêu cầu tình huống.' },
      { left: 'Phong cách (Style/Tone)', right: 'Yêu cầu viết bằng giọng điệu hài hước, trang trọng.' },
      { left: 'Vai trò (Role/Persona)', right: 'Yêu cầu AI đóng vai là một Huấn luyện viên thể hình.' }
    ],
    explanation: 'Các thành phần của một câu lệnh hoàn chỉnh: Role, Content, Context, Style, Target/Format.'
  },
  {
    id: 'p6', category: 'prompting_basics', type: 'fill',
    text: 'Điền từ khóa đúng vào các phương pháp prompt: Kỹ thuật khai thác kiến thức ( ',
    chunks: [' ) là khi bạn yêu cầu AI ', ' trước, sau đó mới dùng để giải quyết câu hỏi.'],
    blanks: [
      { options: ['Generate Knowledge', 'Chain of Thought', 'Few-shot'], correctAnswer: 'Generate Knowledge' },
      { options: ['định nghĩa khái niệm', 'dịch ngôn ngữ', 'chạy mã python'], correctAnswer: 'định nghĩa khái niệm' }
    ],
    explanation: 'Generate Knowledge Prompting yêu cầu mô hình truy cập và xuất kiến thức nền về 1 topic trước khi trả lời câu hỏi cụ thể.'
  },
  {
    id: 'p7', category: 'prompting_basics', type: 'single',
    text: 'Chain-of-thought (Tư duy chuỗi) là gì?',
    options: ['Yêu cầu AI đưa ra câu trả lời cuối cùng ngay lập tức.', 'Buộc AI phải trình bày các bước suy luận logic trước khi kết luận.', 'Dịch thuật giữa nhiều ngôn ngữ song song.', 'Cung cấp 100 ví dụ cho một nhiệm vụ.'],
    correctAnswer: 'Buộc AI phải trình bày các bước suy luận logic trước khi kết luận.',
    explanation: 'Bằng cách thêm "Hãy suy nghĩ từng bước", AI áp dụng tư duy chuỗi để tránh lỗi logic học.'
  },
  {
    id: 'p8', category: 'prompting_basics', type: 'multiple',
    text: 'Khi bạn thêm tài liệu nghiên cứu làm "khung tham chiếu" cho một câu lệnh AI (context), lợi ích là gì? (Chọn 2)',
    options: ['Tăng tỷ lệ tạo ra kết quả chính xác và cụ thể.', 'Giảm thiểu tình trạng ảo giác (hallucination).', 'Sẽ khiến AI tự động ngừng hoạt động.', 'Giảm tốc độ CPU của máy tính bạn.'],
    correctAnswers: ['Tăng tỷ lệ tạo ra kết quả chính xác và cụ thể.', 'Giảm thiểu tình trạng ảo giác (hallucination).'],
    explanation: 'Việc nhúng bối cảnh giúp Grounding dữ liệu, thu hẹp không gian dự đoán và giảm ảo giác.'
  },
  {
    id: 'p9', category: 'prompting_basics', type: 'single',
    text: 'Tuyên bố "Hãy giải thích cho tôi hiểu như một học sinh lớp 5" là việc áp dụng yếu tố nào vào câu lệnh?',
    options: ['Tinh chỉnh lặp lại', 'Điều hướng đối tượng nhắm đến (Target Audience)', 'Đảo ngược câu lệnh (Reverse Prompting)', 'Kiểm chứng thực tế'],
    correctAnswer: 'Điều hướng đối tượng nhắm đến (Target Audience)',
    explanation: 'Giúp AI tự động đơn giản hóa lý thuyết và sử dụng từ vựng dễ hiểu.'
  },
  {
    id: 'p10', category: 'prompting_basics', type: 'multiple',
    text: 'Yếu tố nào giúp đảm bảo từ vựng chuyên ngành được AI dịch chính xác nhất? (Chọn 2)',
    options: ['Bảng thuật ngữ (Glossary) đính kèm', 'Sử dụng hướng dẫn phong cách (Style Guide) nghiêm ngặt', 'Gán một nhân cách AI', 'Sử dụng ngôn ngữ lập trình'],
    correctAnswers: ['Bảng thuật ngữ (Glossary) đính kèm', 'Sử dụng hướng dẫn phong cách (Style Guide) nghiêm ngặt'],
    explanation: 'Bảng thuật ngữ giúp ghim các định nghĩa cố định, Style guide giới hạn văn phong.'
  },
  {
    id: 'p11', category: 'prompting_basics', type: 'single',
    text: 'Để điều chỉnh video thành màu trắng đen hoài cổ, câu lệnh nào tốt nhất?',
    options: ['Làm cho video này không có màu.', 'Tô màu video này.', 'Sử dụng ảnh đã tải lên, tạo một phiên bản cổ điển (vintage) đơn sắc.', 'Tô màu đỏ cho video.'],
    correctAnswer: 'Sử dụng ảnh đã tải lên, tạo một phiên bản cổ điển (vintage) đơn sắc.',
    explanation: 'Chỉ định phong cách (vintage) và màu (đơn sắc) cùng đối tượng tham chiếu gốc.'
  },
  {
    id: 'p12', category: 'prompting_basics', type: 'match',
    text: 'Ghép loại tóm tắt với phương pháp của nó:',
    pairs: [
      { left: 'Tóm tắt Trích xuất (Extractive)', right: 'Lấy trực tiếp các câu quan trọng nhất từ văn bản gốc.' },
      { left: 'Tóm tắt Trừu tượng (Abstractive)', right: 'Viết lại bằng ngôn từ mới, khái quát ý chính.' },
      { left: 'Tóm tắt theo Truy vấn (Query-based)', right: 'Chỉ tóm tắt dựa trên một câu hỏi cụ thể.' }
    ]
  }
];
