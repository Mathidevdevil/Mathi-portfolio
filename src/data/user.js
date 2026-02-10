export const userData = {
    personal: {
        name: "Mathiyarasu",
        role: "Software Developer",
        tagline: "Engineering Robust Solutions | ECE Graduate '25",
        location: "Anna University, Chennai (GEC Erode)",
        email: ["mathiyarasuarumugamk@gmail.com"],
        github: "https://github.com/Mathidevdevil",
        linkedin: "https://www.linkedin.com/in/mathiyarasu2001/",
        instagram: "https://www.instagram.com/ivan_enginner_?igsh=enNlb2IxbzFuM2Vv",
        twitter: "https://x.com/MrMathiyarasu", // X (formerly Twitter)
        resume: "https://mathi-resume.vercel.app/", // Replace with your actual resume file path or link
        resumePdf: "/Mathiyarasu_Resume.pdf" // Path to your PDF resume in the public folder
    },
    about: {
        description: "I am a 2025 ECE Graduate turned Full Stack Developer. Blending the precision of electronics engineering with the creativity of software development. Trained in Bangalore, I specialize in building scalable, secure, and high-performance applications using the Java ecosystem.",
        education: [
            {
                year: "Aug 2022 – May 2025",
                degree: "B.E. Electronics & Communication Engineering",
                institution: "Anna University (Chennai), Government College of Engineering, Erode",
                details: "CGPA 7.2"
            },
            {
                year: "June 2018 – May 2021",
                degree: "Diploma in Electronics & Communication Engineering",
                institution: "DOTE, The Kavery Polytechnic College, Salem",
                details: "Percentage: 87%"
            },
            {
                year: "Feb 2025 - July 2025",
                degree: "Full Stack Java Development",
                institution: "Besant Technologies - Bangalore",
                details: "Comprehensive training in Core Java, Spring Boot, React, and Database Management. Status: Completed"
            }
        ]
    },
    skills: {
        frontend: ["React.js", "HTML5/CSS3", "JavaScript", "TailwindCSS"],
        backend: ["Java", "Spring Boot", "Python"],
        database: ["MySQL", "MongoDB"],
        tools: ["VS Code", "Eclipse", "Git", "Jupyter Notebook"],
        automation: ["n8n Basics"]
    },
    projects: {
        fullstack: [
            {
                title: "Student Management System",
                description: "A web-based system designed to efficiently store and manage student personal and academic records. Automates record handling to reduce manual errors.",
                tech: ["Java", "MySQL", "HTML/CSS"],
                github: "https://github.com/Mathidevdevil/Student-Management-System",
                details: {
                    objectives: [
                        "Design an efficient student record management system",
                        "Automate data entry and retrieval processes",
                        "Reduce manual errors in record keeping",
                        "Provide secure access to student information"
                    ],
                    features: [
                        "Student Registration & Profile Management",
                        "Academic Records Tracking",
                        "Search & Filter Functionality",
                        "Secure Authentication System",
                        "Report Generation"
                    ],
                    technologies: {
                        backend: ["Java", "JDBC"],
                        database: ["MySQL"],
                        frontend: ["HTML5", "CSS3", "JavaScript"]
                    },
                    highlights: [
                        "Implemented CRUD operations for student records",
                        "Designed normalized database schema",
                        "Created responsive user interface",
                        "Integrated form validation and error handling"
                    ],
                    outcome: "Successfully developed a functional student management system that streamlines administrative tasks and improves data accuracy."
                }
            },
            {
                title: "Online Shopping Website",
                description: "A responsive e-commerce web application allowing users to browse products and manage a shopping cart. Features a clean UI and smooth navigation.",
                tech: ["React", "HTML/CSS", "JavaScript"],
                github: "https://github.com/Mathidevdevil/Online-shopping-website",
                demo: "https://online-shophub.netlify.app/",
                details: {
                    objectives: [
                        "Build a modern e-commerce platform",
                        "Implement responsive design for all devices",
                        "Create intuitive user experience",
                        "Develop efficient cart management system"
                    ],
                    features: [
                        "Product Catalog with Search & Filters",
                        "Shopping Cart Management",
                        "Responsive Design",
                        "Product Detail Pages",
                        "User-friendly Navigation"
                    ],
                    technologies: {
                        frontend: ["React.js", "JavaScript", "HTML5", "CSS3"],
                        stateManagement: ["React Hooks"],
                        styling: ["CSS3", "Responsive Design"]
                    },
                    highlights: [
                        "Developed reusable React components",
                        "Implemented state management for cart functionality",
                        "Created responsive layouts for mobile and desktop",
                        "Optimized performance with React best practices"
                    ],
                    outcome: "Delivered a fully functional e-commerce website with smooth user experience and modern design aesthetics."
                }
            }
        ],
        ml: [
            {
                title: "Student Performance Prediction",
                description: "A machine learning project predicting student academic performance using historical data. Focuses on data preprocessing and ML workflows.",
                tech: ["Python", "Pandas/NumPy", "Scikit-learn"],
                github: "https://github.com/Mathidevdevil/Student-Performance-Prediction-Machine-Learning-",
                details: {
                    objectives: [
                        "Predict student academic performance accurately",
                        "Identify key factors affecting student success",
                        "Implement data preprocessing pipeline",
                        "Compare multiple ML algorithms for best results"
                    ],
                    features: [
                        "Data Preprocessing & Cleaning",
                        "Feature Engineering",
                        "Multiple ML Model Training",
                        "Model Evaluation & Comparison",
                        "Performance Visualization"
                    ],
                    technologies: {
                        language: ["Python"],
                        libraries: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
                        algorithms: ["Linear Regression", "Decision Trees", "Random Forest"]
                    },
                    highlights: [
                        "Performed comprehensive data analysis and visualization",
                        "Engineered relevant features from raw data",
                        "Trained and evaluated multiple ML models",
                        "Achieved high prediction accuracy",
                        "Generated insights on performance factors"
                    ],
                    outcome: "Successfully built a predictive model that helps identify at-risk students and understand key performance indicators in academic success."
                }
            },
            {
                title: "1-Bit MIMO Precoding in DACs using Deep Learning",
                description: "Deep learning-based precoding framework for massive MIMO systems with 1-bit DACs, targeting low-cost and energy-efficient communication. Final year B.E. ECE project.",
                tech: ["Python", "PyTorch", "CNN", "Deep Learning", "SciPy"],
                github: "https://github.com/Mathidevdevil/1-Bit-MIMO-Precoding-in-DACs-using-Deep-Learning",
                details: {
                    objectives: [
                        "Design a deep learning-based precoding framework for massive MIMO systems",
                        "Optimize communication with 1-bit DACs for low-cost implementation",
                        "Reduce interference and overcome hardware constraints",
                        "Achieve energy-efficient wireless communication"
                    ],
                    features: [
                        "Residual Neural Network Architecture",
                        "CSI to Precoding Vector Mapping",
                        "Interference Reduction Algorithms",
                        "Hardware Constraint Optimization",
                        "Energy-Efficient Communication Design"
                    ],
                    technologies: {
                        language: ["Python"],
                        frameworks: ["PyTorch"],
                        techniques: ["Convolutional Neural Networks (CNN)", "Deep Learning", "Residual Networks"],
                        libraries: ["SciPy", "NumPy", "Matplotlib"]
                    },
                    highlights: [
                        "Designed residual neural network to map CSI to optimized precoding vectors",
                        "Implemented deep learning framework for massive MIMO systems",
                        "Addressed hardware constraints of 1-bit DACs",
                        "Reduced interference in multi-user communication scenarios",
                        "Achieved significant performance improvement over conventional methods"
                    ],
                    outcome: "Successfully developed a deep learning-based precoding solution that enables low-cost, energy-efficient massive MIMO communication systems while maintaining high performance despite 1-bit DAC hardware constraints. This B.E. ECE final year project demonstrated the practical application of deep learning in wireless communication systems."
                }
            }
        ],
        iot: [
            {
                title: "Smart Lock System",
                description: "An IoT-based security solution with remote access, real-time monitoring, and camera-based authentication for enhanced door security.",
                tech: ["ESP32-CAM", "Embedded C", "Blynk IoT", "Arduino"],
                github: "https://github.com/Mathidevdevil/Smart-lock-system",
                details: {
                    objectives: [
                        "Design a secure IoT-enabled smart lock system",
                        "Enable remote lock control via mobile application",
                        "Enhance security using camera monitoring and notifications",
                        "Provide real-time status updates and activity logs"
                    ],
                    features: [
                        "🔐 Remote Lock & Unlock Control",
                        "📸 Live Camera Monitoring",
                        "📱 Mobile App Control using Blynk",
                        "🔔 Instant Notifications for Door Activity",
                        "📊 Activity Logs for Access Tracking",
                        "🌐 Wi-Fi Enabled IoT Communication"
                    ],
                    hardware: [
                        "ESP32-CAM Microcontroller",
                        "Camera Module (OV2640)",
                        "Motorized Locking Mechanism",
                        "TIP122 Darlington Transistor",
                        "FTDI USB-to-Serial Interface",
                        "Power Supply & Connecting Components"
                    ],
                    technologies: {
                        embedded: ["Embedded C", "Arduino"],
                        firmware: ["ESP32-CAM Firmware"],
                        platform: ["Blynk IoT Platform"],
                        communication: ["Wi-Fi", "MQTT"],
                        mobile: ["Blynk Mobile App"]
                    },
                    security: [
                        "Encrypted communication between device and mobile app",
                        "Camera-based authentication for access monitoring",
                        "Secure Wi-Fi connectivity (WPA/WPA2)",
                        "Controlled access via authenticated mobile application"
                    ],
                    highlights: [
                        "Programmed ESP32-CAM to handle camera capture, Wi-Fi communication, and lock control",
                        "Integrated motor driver circuit using TIP122 transistor",
                        "Implemented real-time notifications and lock status updates via Blynk",
                        "Successfully tested remote access and alert mechanisms"
                    ],
                    futureEnhancements: [
                        "Biometric authentication (Fingerprint / Face Recognition)",
                        "AI-based access prediction",
                        "Blockchain-based tamper-proof access logs",
                        "Integration with smart home ecosystems"
                    ],
                    outcome: "The project successfully demonstrated an IoT-based smart security system that improves convenience, safety, and real-time monitoring. It provided hands-on experience in embedded systems, IoT communication, and hardware-software integration."
                }
            }
        ]
    },
    certifications: [
        {
            title: "Crash Course on Python",
            issuer: "Coursera",
            date: "Feb 2023",
            type: "E-Learning",
            link: "https://www.coursera.org/account/accomplishments/verify/H6D8ZLTH7BPS"
        },
        {
            title: "network Essential",
            issuer: "Cisco Network Academy",
            date: "Apr 2023",
            type: "E-Learning",
            link: "https://drive.google.com/file/d/1Dgtcf-9z4UcIyXHlXAu4QvTGKmPpfhzR/view"
        },
        {
            title: "HTML/CSS",
            issuer: "GUVI",
            date: "June 2024",
            type: "E-Learning",
            link: "https://www.guvi.in/verify-certificate?id=38C211D824XA1Mg7i0"
        },
        {
            title: "JavaScript",
            issuer: "GUVI",
            date: "June 2024",
            type: "E-Learning",
            link: "https://www.guvi.in/verify-certificate?id=XJ27p611O679K044q8"
        },
        {
            title: "GIT",
            issuer: "GUVI",
            date: "June 2024",
            type: "E-Learning",
            link: "https://www.guvi.in/verify-certificate?id=4694i412B271F2pS71"
        }
    ]
};
