import { Student, Guardian, QuizQuestion } from "./types";

export const studentData: Student[] = [
  {
    id: 1,
    key: 1,
    name: "John Doe",
    user_id: "USR001",
    phone_number: "+1234567890",
    reg_date: "2025-01-20",
    email: "johndoe@example.com",
    class: "Mathematics",
  },
  {
    id: 2,
    key: 2,
    name: "Jane Smith",
    user_id: "USR002",
    phone_number: "+1234567891",
    reg_date: "2025-01-21",
    email: "janesmith@example.com",
    class: "Science",
  },
  {
    id: 3,
    key: 3,
    name: "Alice Johnson",
    user_id: "USR003",
    phone_number: "+1234567892",
    reg_date: "2025-01-22",
    email: "alicejohnson@example.com",
    class: "English",
  },
  {
    id: 4,
    key: 4,
    name: "Robert Brown",
    user_id: "USR004",
    phone_number: "+1234567893",
    reg_date: "2025-01-23",
    email: "robertbrown@example.com",
    class: "History",
  },
  {
    id: 5,
    key: 5,
    name: "Emily Davis",
    user_id: "USR005",
    phone_number: "+1234567894",
    reg_date: "2025-01-24",
    email: "emilydavis@example.com",
    class: "Geography",
  },
  {
    id: 6,
    key: 6,
    name: "Michael Wilson",
    user_id: "USR006",
    phone_number: "+1234567895",
    reg_date: "2025-01-25",
    email: "michaelwilson@example.com",
    class: "Physics",
  },
  {
    id: 7,
    key: 7,
    name: "Sophia Taylor",
    user_id: "USR007",
    phone_number: "+1234567896",
    reg_date: "2025-01-26",
    email: "sophiataylor@example.com",
    class: "Chemistry",
  },
  {
    id: 8,
    key: 8,
    name: "David Martinez",
    user_id: "USR008",
    phone_number: "+1234567897",
    reg_date: "2025-01-27",
    email: "davidmartinez@example.com",
    class: "Biology",
  },
  {
    id: 9,
    key: 9,
    name: "Olivia Anderson",
    user_id: "USR009",
    phone_number: "+1234567898",
    reg_date: "2025-01-28",
    email: "oliviaanderson@example.com",
    class: "Literature",
  },
  {
    id: 10,
    key: 10,
    name: "James Thomas",
    user_id: "USR010",
    phone_number: "+1234567899",
    reg_date: "2025-01-29",
    email: "jamesthomas@example.com",
    class: "Computer Science",
  },
];

export const guardianData: Guardian[] = [
  {
    id: 1,
    key: 1,
    name: "Jane Doe",
    user_id: "USR002",
    phone_number: "+9876543210",
    reg_date: "2025-01-22",
    email: "janedoe@example.com",
  },
  {
    id: 2,
    key: 2,
    name: "Jane Doe",
    user_id: "USR002",
    phone_number: "+9876543210",
    reg_date: "2025-01-22",
    email: "janedoe@example.com",
  },
  {
    id: 3,
    key: 3,
    name: "Michael Smith",
    user_id: "USR003",
    phone_number: "+1122334455",
    reg_date: "2025-02-10",
    email: "michaelsmith@example.com",
  },
  {
    id: 4,
    key: 4,
    name: "Sarah Johnson",
    user_id: "USR004",
    phone_number: "+9988776655",
    reg_date: "2025-02-15",
    email: "sarahjohnson@example.com",
  },
  {
    id: 5,
    key: 5,
    name: "David Williams",
    user_id: "USR005",
    phone_number: "+6677889900",
    reg_date: "2025-03-01",
    email: "davidwilliams@example.com",
  },
  {
    id: 6,
    key: 6,
    name: "Emily Brown",
    user_id: "USR006",
    phone_number: "+5544332211",
    reg_date: "2025-03-12",
    email: "emilybrown@example.com",
  },
  {
    id: 7,
    key: 7,
    name: "Robert Jones",
    user_id: "USR007",
    phone_number: "+4455667788",
    reg_date: "2025-04-05",
    email: "robertjones@example.com",
  },
  {
    id: 8,
    key: 8,
    name: "Olivia Martinez",
    user_id: "USR008",
    phone_number: "+3322114455",
    reg_date: "2025-04-18",
    email: "oliviamartinez@example.com",
  },

  {
    id: 9,
    key: 9,
    name: "William Davis",
    user_id: "USR009",
    phone_number: "+1199887766",
    reg_date: "2025-05-07",
    email: "williamdavis@example.com",
  },

  {
    id: 10,
    key: 10,
    name: "Sophia Wilson",
    user_id: "USR010",
    phone_number: "+6677554433",
    reg_date: "2025-05-20",
    email: "sophiawilson@example.com",
  },
  {
    id: 11,
    key: 11,
    name: "James Anderson",
    user_id: "USR011",
    phone_number: "+1122446688",
    reg_date: "2025-06-03",
    email: "jamesanderson@example.com",
  },
  {
    id: 12,
    key: 12,
    name: "Charlotte Thomas",
    user_id: "USR012",
    phone_number: "+3344556677",
    reg_date: "2025-06-15",
    email: "charlottethomas@example.com",
  },
];

export const StudentActionsData = [
  { id: 1, label: "View Student Details" },
  { id: 2, label: "Suspend Student" },
  { id: 3, label: "Subscribe for Student" },
  { id: 4, label: "Subscription History" },
  { id: 5, label: "Delete Student" },
];

export const classData = [
  { key: "1", class: "Common Entrance Prep", id: "Exam", no_of_subject: 20 },
  { key: "2", class: "Common Entrance Prep", id: "Exam", no_of_subject: 10 },
  { key: "3", class: "Common Entrance Prep", id: "Exam", no_of_subject: 70 },
  { key: "4", class: "Disabled User", id: 99, no_of_subject: 2 },
];

export const subjectData = [
  {
    id: 1,
    class: "Common Entrance",
    subjects: [
      {
        key: 1,
        subject: "Mathematics",
        subject_code: "MA",
        number_of_topics: 10,
      },
      {
        key: 2,
        subject: "English",
        subject_code: "MA",
        number_of_topics: 20,
      },
    ],
  },
  {
    id: 2,
    class: "Waec",
    subjects: [
      {
        key: 3,
        subject: "Mathematics",
        subject_code: "MA",
        number_of_topics: 10,
      },
      {
        key: 4,
        subject: "English",
        subject_code: "MA",
        number_of_topics: 20,
      },
      {
        key: 5,
        subject: "Basic Science",
        subject_code: "MA",
        number_of_topics: 5,
      },
    ],
  },
];

export const payments = [
  {
    key: 1,
    id: "PAY123456",
    paymentDate: "2025-02-02",
    type: "Credit Card",
    description: "Monthly subscription payment",
    amount: 49.99,
    status: "Success",
  },
  {
    key: 3,
    id: "PAY123457",
    paymentDate: "2025-01-28",
    type: "Bank Transfer",
    description: "Course enrollment fee",
    amount: 150.0,
    status: "Pending",
  },
  {
    key: 4,
    id: "PAY123458",
    paymentDate: "2025-01-15",
    type: "PayPal",
    description: "E-book purchase",
    amount: 10.5,
    status: "Failed",
  },
  {
    key: 5,
    id: "PAY123459",
    paymentDate: "2025-02-01",
    type: "Debit Card",
    description: "Software license renewal",
    amount: 99.99,
    status: "Success",
  },
  {
    key: 6,
    id: "PAY123460",
    paymentDate: "2025-01-20",
    type: "Cryptocurrency",
    description: "NFT marketplace transaction",
    amount: 200.75,
    status: "Pending",
  },
  {
    key: 7,
    id: "PAY123461",
    paymentDate: "2025-01-10",
    type: "Cash",
    description: "Gym membership fee",
    amount: 30.0,
    status: "Failed",
  },
];

export const subscriptions = [
  {
    key: 1,
    class: "Common Entrance Prep",
    planName: "Basic Plan",
    validity: "1 Month",
    amount: 5000,
  },
  {
    key: 2,
    class: "Common Entrance Prep",
    planName: "Standard Plan",
    validity: "3 Months",
    amount: 12000,
  },
  {
    key: 3,
    class: "Common Entrance Prep",
    planName: "Premium Plan",
    validity: "6 Months",
    amount: 22000,
  },
  {
    key: 4,
    class: "Junior High School",
    planName: "Basic Plan",
    validity: "1 Month",
    amount: 6000,
  },
  {
    key: 5,
    class: "Junior High School",
    planName: "Standard Plan",
    validity: "3 Months",
    amount: 15000,
  },
  {
    key: 6,
    class: "Junior High School",
    planName: "Premium Plan",
    validity: "6 Months",
    amount: 28000,
  },
];

export const notifications = [
  {
    key: "1",
    messageTitle: "Monthly Plan Renewal",
    dateSent: "2025-02-01",
    type: "Subscription",
    recipient: "user1@example.com",
    status: "Success",
  },
  {
    key: "2",
    messageTitle: "Yearly Plan Upgrade",
    dateSent: "2025-01-15",
    type: "Subscription",
    recipient: "user2@example.com",
    status: "Pending",
  },
  {
    key: "3",
    messageTitle: "Payment Confirmation",
    dateSent: "2025-01-10",
    type: "Invoice",
    recipient: "user3@example.com",
    status: "Failed",
  },
  {
    key: "4",
    messageTitle: "Auto-Renewal Notification",
    dateSent: "2025-02-02",
    type: "Notification",
    recipient: "user4@example.com",
    status: "Success",
  },
  {
    key: "5",
    messageTitle: "Subscription Canceled",
    dateSent: "2024-12-30",
    type: "Cancellation",
    recipient: "user5@example.com",
    status: "Success",
  },
  {
    key: "6",
    messageTitle: "Plan Downgrade Confirmation",
    dateSent: "2025-01-20",
    type: "Subscription",
    recipient: "user6@example.com",
    status: "Pending",
  },
];

export const questionMock: QuizQuestion[] = [
  {
    _id: "690347d0c21053c4473bd71d",
    text: "What is 1/2 + 1/2?",
    options: [
      {
        text: "1",
        isCorrect: true,
        _id: "690347d0c21053c4473bd71e",
      },
      {
        text: "1/4",
        isCorrect: false,
        _id: "690347d0c21053c4473bd71f",
      },
      {
        text: "2/4",
        isCorrect: false,
        _id: "690347d0c21053c4473bd720",
      },
      {
        text: "1/3",
        isCorrect: false,
        _id: "690347d0c21053c4473bd721",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd722",
    text: "Which of the following fractions is equivalent to 2/4?",
    options: [
      {
        text: "1/2",
        isCorrect: true,
        _id: "690347d0c21053c4473bd723",
      },
      {
        text: "3/4",
        isCorrect: false,
        _id: "690347d0c21053c4473bd724",
      },
      {
        text: "4/6",
        isCorrect: false,
        _id: "690347d0c21053c4473bd725",
      },
      {
        text: "2/8",
        isCorrect: false,
        _id: "690347d0c21053c4473bd726",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd727",
    text: "What is 3/5 + 2/5?",
    options: [
      {
        text: "5/5",
        isCorrect: true,
        _id: "690347d0c21053c4473bd728",
      },
      {
        text: "1/5",
        isCorrect: false,
        _id: "690347d0c21053c4473bd729",
      },
      {
        text: "6/5",
        isCorrect: false,
        _id: "690347d0c21053c4473bd72a",
      },
      {
        text: "3/10",
        isCorrect: false,
        _id: "690347d0c21053c4473bd72b",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd72c",
    text: "Which fraction is the largest?",
    options: [
      {
        text: "3/4",
        isCorrect: true,
        _id: "690347d0c21053c4473bd72d",
      },
      {
        text: "2/5",
        isCorrect: false,
        _id: "690347d0c21053c4473bd72e",
      },
      {
        text: "1/3",
        isCorrect: false,
        _id: "690347d0c21053c4473bd72f",
      },
      {
        text: "3/8",
        isCorrect: false,
        _id: "690347d0c21053c4473bd730",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd731",
    text: "What is 5/6 - 1/3?",
    options: [
      {
        text: "1/2",
        isCorrect: true,
        _id: "690347d0c21053c4473bd732",
      },
      {
        text: "2/3",
        isCorrect: false,
        _id: "690347d0c21053c4473bd733",
      },
      {
        text: "1/6",
        isCorrect: false,
        _id: "690347d0c21053c4473bd734",
      },
      {
        text: "5/9",
        isCorrect: false,
        _id: "690347d0c21053c4473bd735",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd736",
    text: "Convert 3/4 to a decimal.",
    options: [
      {
        text: "0.75",
        isCorrect: true,
        _id: "690347d0c21053c4473bd737",
      },
      {
        text: "0.25",
        isCorrect: false,
        _id: "690347d0c21053c4473bd738",
      },
      {
        text: "1.25",
        isCorrect: false,
        _id: "690347d0c21053c4473bd739",
      },
      {
        text: "0.5",
        isCorrect: false,
        _id: "690347d0c21053c4473bd73a",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd73b",
    text: "What is 1/2 × 1/2?",
    options: [
      {
        text: "1/4",
        isCorrect: true,
        _id: "690347d0c21053c4473bd73c",
      },
      {
        text: "1",
        isCorrect: false,
        _id: "690347d0c21053c4473bd73d",
      },
      {
        text: "1/2",
        isCorrect: false,
        _id: "690347d0c21053c4473bd73e",
      },
      {
        text: "2/4",
        isCorrect: false,
        _id: "690347d0c21053c4473bd73f",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd740",
    text: "Which fraction is equal to 0.2?",
    options: [
      {
        text: "1/5",
        isCorrect: true,
        _id: "690347d0c21053c4473bd741",
      },
      {
        text: "1/4",
        isCorrect: false,
        _id: "690347d0c21053c4473bd742",
      },
      {
        text: "2/3",
        isCorrect: false,
        _id: "690347d0c21053c4473bd743",
      },
      {
        text: "3/8",
        isCorrect: false,
        _id: "690347d0c21053c4473bd744",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd745",
    text: "What is 2/3 × 3/4?",
    options: [
      {
        text: "1/2",
        isCorrect: true,
        _id: "690347d0c21053c4473bd746",
      },
      {
        text: "3/4",
        isCorrect: false,
        _id: "690347d0c21053c4473bd747",
      },
      {
        text: "2/4",
        isCorrect: false,
        _id: "690347d0c21053c4473bd748",
      },
      {
        text: "1/3",
        isCorrect: false,
        _id: "690347d0c21053c4473bd749",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd74a",
    text: "Which of the following is an improper fraction?",
    options: [
      {
        text: "7/4",
        isCorrect: true,
        _id: "690347d0c21053c4473bd74b",
      },
      {
        text: "3/5",
        isCorrect: false,
        _id: "690347d0c21053c4473bd74c",
      },
      {
        text: "5/9",
        isCorrect: false,
        _id: "690347d0c21053c4473bd74d",
      },
      {
        text: "2/7",
        isCorrect: false,
        _id: "690347d0c21053c4473bd74e",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd74f",
    text: "Which mixed number is equivalent to 7/3?",
    options: [
      {
        text: "2 1/3",
        isCorrect: true,
        _id: "690347d0c21053c4473bd750",
      },
      {
        text: "3 1/2",
        isCorrect: false,
        _id: "690347d0c21053c4473bd751",
      },
      {
        text: "1 2/3",
        isCorrect: false,
        _id: "690347d0c21053c4473bd752",
      },
      {
        text: "2 2/3",
        isCorrect: false,
        _id: "690347d0c21053c4473bd753",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd754",
    text: "What is the greatest common factor (GCF) of 8 and 12?",
    options: [
      {
        text: "4",
        isCorrect: true,
        _id: "690347d0c21053c4473bd755",
      },
      {
        text: "2",
        isCorrect: false,
        _id: "690347d0c21053c4473bd756",
      },
      {
        text: "8",
        isCorrect: false,
        _id: "690347d0c21053c4473bd757",
      },
      {
        text: "6",
        isCorrect: false,
        _id: "690347d0c21053c4473bd758",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd759",
    text: "Convert 5/8 to a decimal.",
    options: [
      {
        text: "0.625",
        isCorrect: true,
        _id: "690347d0c21053c4473bd75a",
      },
      {
        text: "0.75",
        isCorrect: false,
        _id: "690347d0c21053c4473bd75b",
      },
      {
        text: "0.8",
        isCorrect: false,
        _id: "690347d0c21053c4473bd75c",
      },
      {
        text: "0.5",
        isCorrect: false,
        _id: "690347d0c21053c4473bd75d",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd75e",
    text: "What is 1/3 + 1/6?",
    options: [
      {
        text: "1/2",
        isCorrect: true,
        _id: "690347d0c21053c4473bd75f",
      },
      {
        text: "1/3",
        isCorrect: false,
        _id: "690347d0c21053c4473bd760",
      },
      {
        text: "2/3",
        isCorrect: false,
        _id: "690347d0c21053c4473bd761",
      },
      {
        text: "1/6",
        isCorrect: false,
        _id: "690347d0c21053c4473bd762",
      },
    ],
  },
  {
    _id: "690347d0c21053c4473bd763",
    text: "What is the least common multiple (LCM) of 4 and 6?",
    options: [
      {
        text: "12",
        isCorrect: true,
        _id: "690347d0c21053c4473bd764",
      },
      {
        text: "6",
        isCorrect: false,
        _id: "690347d0c21053c4473bd765",
      },
      {
        text: "24",
        isCorrect: false,
        _id: "690347d0c21053c4473bd766",
      },
      {
        text: "18",
        isCorrect: false,
        _id: "690347d0c21053c4473bd767",
      },
    ],
  },
];
