import { Question } from './types';

export const questions3: Question[] = [
  {
    id: 'e11', category: 'ethics', type: 'single',
    text: 'Bộ phận nhân sự muốn dùng AI để phân tích hồ sơ tính cách của ứng viên. Hành động nào đảm bảo rủi ro pháp lý và đạo đức được ngăn chặn tốt nhất?',
    options: [
      'Để AI tự động tải toàn bộ CV của ứng viên mà không cần ứng viên đồng ý.',
      'Sử dụng một hệ thống AI cục bộ (Local LLM) hoàn toàn khép kín và có sự đồng ý của ứng viên.',
      'Cho AI quyền quyết định cuối cùng về việc tuyển ứng viên để đảm bảo tính minh bạch.',
      'Dịch cấu trúc CV bằng Google Translate trước khi nộp.'
    ],
    correctAnswer: 'Sử dụng một hệ thống AI cục bộ (Local LLM) hoàn toàn khép kín và có sự đồng ý của ứng viên.',
    explanation: 'Dữ liệu ứng viên là bí mật cá nhân nhạy cảm, chỉ được giám định khi hệ thống bảo mật hoàn toàn khép kín và có sự cho phép.'
  },
  {
    id: 'e12', category: 'ethics', type: 'match',
    text: 'Xác định mức độ can thiệp AI tương ứng với từng giai đoạn tạo nội dung thương mại để tránh vi phạm.',
    pairs: [
      { left: 'Ý tưởng ban đầu', right: 'Dùng AI an toàn để tìm kiếm cảm hứng (Brainstorm).' },
      { left: 'Dữ liệu đào tạo', right: 'Chỉ sử dụng dữ liệu doanh nghiệp đã xin phép tham chiếu.' },
      { left: 'Phê duyệt cuối cùng', right: 'Nhân viên giám sát phải chốt trước khi xuất bản.' }
    ]
  },
  {
    id: 'a9', category: 'accuracy', type: 'multiple',
    text: 'Những cách nào giúp mô hình AI phân loại văn bản giảm thiểu sai số nhất? (Chọn 2)',
    options: [
      'Gắn thêm 1 ví dụ cụ thể (One-shot) trong lệnh.',
      'Yêu cầu AI không bao giờ nói "Tôi không biết".',
      'Định nghĩa gắt gao các tiêu chí phân loại trong câu lệnh.',
      'Nhập vào một hình ảnh không liên quan.'
    ],
    correctAnswers: ['Gắn thêm 1 ví dụ cụ thể (One-shot) trong lệnh.', 'Định nghĩa gắt gao các tiêu chí phân loại trong câu lệnh.'],
    explanation: 'Giới hạn định nghĩa và cung cấp ví dụ sẽ giúp AI không bị lạc đề.'
  },
  {
    id: 'a10', category: 'accuracy', type: 'single',
    text: 'Khi bạn yêu cầu LLM tóm tắt đoạn văn và nó trả về kết quả ngắn gọn nhưng sai ý chính của tác giả ban đầu. Tính trạng này gọi là gì?',
    options: [
      'Tóm tắt trích xuất vô nghĩa.',
      'Ảo giác thông tin trong quá trình cô đọng (Abstractive Hallucination).',
      'Lỗi phần cứng GPU.',
      'Lỗi bộ nhớ đệm (Cache miss).'
    ],
    correctAnswer: 'Ảo giác thông tin trong quá trình cô đọng (Abstractive Hallucination).',
    explanation: 'Khi mô hình cố gắng tổng hợp ý bằng từ ngữ mới (abstractive), nó có thể tạo ra các từ sai lệch hoàn toàn với luận điểm gốc.'
  },
  {
    id: 'p13', category: 'prompting_basics', type: 'single',
    text: 'Trong kiến trúc Prompt kỹ thuật, sự khác biệt giữa System Prompt (lệnh hệ thống) và User Prompt (lệnh người dùng) là gì?',
    options: [
      'System Prompt hướng dẫn tính cách và quy định chung của AI, User Prompt là yêu cầu cụ thể tại mỗi lượt trò chuyện.',
      'System Prompt do AI quyết định, User Prompt do lập trình viên quyết định.',
      'Cả hai đều giống hệt nhau về thứ tự ưu tiên.',
      'System Prompt được dùng tạo hình ảnh, User Prompt dùng tạo văn bản.'
    ],
    correctAnswer: 'System Prompt hướng dẫn tính cách và quy định chung của AI, User Prompt là yêu cầu cụ thể tại mỗi lượt trò chuyện.',
    explanation: 'System Prompt là khung cơ bản để định hình hành vi toàn cục của Bot (ví dụ: "Ngươi là trợ lý y tế").'
  },
  {
    id: 'tf1', category: 'prompting_basics', type: 'true_false',
    text: 'Zero-shot prompting luôn đem lại kết quả chính xác hơn so với Few-shot prompting khi xử lý các tác vụ phức tạp.',
    correctAnswer: false,
    explanation: 'Sai. Few-shot prompting (cung cấp một vài ví dụ) thường giúp mô hình hiểu rõ hơn định dạng và cách suy luận cho các tác vụ phức tạp, do đó thường mang lại độ chính xác cao hơn so với zero-shot (không có ví dụ nào).'
  }
];
