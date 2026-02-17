export interface Project {
  title: string;
  client: string;
  role: string;
  duration: string;
  description: string;
  responsibilities: string[];
  environment: string[];
}

export interface Employment {
  company: string;
  location: string;
  totalPeriod: string;
  isCurrent?: boolean;
  projects: Project[];
}

export const experiences: Employment[] = [
  {
    company: "Synechron (USA)",
    location: "New Jersey / New York",
    totalPeriod: "May 2019 - Present",
    isCurrent: true,
    projects: [
      {
        title: "Investment Proposals",
        client: "NDA",
        role: "Tech Lead - .NET Core 8",
        duration: "May'24 - Present",
        description: "Leading migration of several legacy systems to .NET Core 8 microservices.",
        responsibilities: [
          "Architected migration for several systems using databases and SQL and DB2.",
          "Implemented AI-driven development workflows with GitHub Copilot.",
          "Managed Jenkins CI/CD and resolved complex infrastructure impediments."
        ],
        environment: [".NET Core 8", "Angular 17", "DB2", "Jenkins", "AI/Copilot"]
      },
      {
        title: "Trading Portfolio CRD Custom Code",
        client: "NDA",
        role: "Tech Lead – Java 17",
        duration: "Jan'24 - May’24",
        description: "Connector between Charles River System and internal bank systems.",
        responsibilities: [
          "Developed high-frequency transaction handlers.",
          "Handled cross-border order processing logic."
        ],
        environment: ["Java 17", "Spring Boot", "Oracle PL/SQL", "Autosys"]
      },
      {
        title: "Digital Disbursements",
        client: "NDA",
        role: "Lead Developer",
        duration: "Dec'22 - Dec'23",
        description: "Microservices-oriented request systems communicating with propietary client system.",
        responsibilities: ["CI/CD implementation", "Propietary client system behavior development", "Team mentoring"],
        environment: ["Spring Boot", "DBeaver", "Postman", "CI/CD"]
      },
      {
        title: "Digital Disbursements (Pension Migration)",
        client: "NDA",
        role: "Lead Developer",
        duration: "Mar'21 - Aug'22",
        description: "Simplified legacy pension requests into an expedite microservices system using Drools engine for business rules execution.",
        responsibilities: [
          "Implemented Java 11/Spring Boot structure with Lombok to speed up development.",
          "Developed Internal system behaviors and new frontend functionalities.",
          "Executed business rules through Drools engine."
        ],
        environment: ["Java 11", "Drools", "Spring Boot", "Lombok", "STS"]
      },
      {
        title: "Trading Portfolio CRD Custom Code (Legacy Support)",
        client: "NDA",
        role: "Tech Developer – Java 11",
        duration: "Sept'19 - Mar'21",
        description: "Connector for Charles River System to receive orders from offshore financial advisors and UI/UX modification to match bank standards.",
        responsibilities: [
          "Handled information transactions between bank systems and CR.",
          "Created scheduled jobs and scripts via Autosys.",
          "Updated project wiki and trained new team members."
        ],
        environment: ["Java 11", "Oracle PL/SQL", "Autosys", "Superputty"]
      },
      {
        title: "Zing Platform",
        client: "NDA",
        role: "Developer – C#",
        duration: "May'19 - Aug'19",
        description: "Multi-platform management system for insurance claims using microservices and Azure Functions.",
        responsibilities: [
          "Backend development on .NET Core C# and Azure Functions.",
          "Frontend development on Angular 6 using NgRx/RxJS for reactive state.",
          "BDD Testing."
        ],
        environment: [".NET Core", "Azure Functions", "Angular 6", "NgRx", "RxJS"]
      }
    ]
  },
  {
    company: "Synechron (UAE)",
    location: "Dubai, United Arab Emirates",
    totalPeriod: "Dec 2018 - May 2019", // Your Dubai contract
    projects: [
      {
        title: "Synechron Dubai POCs",
        client: "Internal / Synechron UAE",
        role: "Developer",
        duration: "Dec'18 - May'19",
        description: "Entry period at Synechron focused on Machine Learning Proof of Concepts.",
        responsibilities: [
          "Developed POC with Lucid Works for automated knowledge base generation from PDFs.",
          "Applied ML techniques for document information extraction."
        ],
        environment: ["Python", "Lucid Works", "Machine Learning", "VSCode"]
      }
    ]
  },
  {
    company: "Universidad Catolica del Norte",
    location: "Antofagasta, Chile",
    totalPeriod: "Mar 2017 - Dec 2018",
    projects: [
      {
        title: "DH Protocol with Hyperelliptic Curves & Neural Synchronization",
        client: "UCN Department of Systems",
        role: "Researcher - Professor",
        duration: "Mar'17 - Dec'18",
        description: "High-level research in Cryptography and Artificial Neural Networks while lecturing undergraduate software engineering.",
        responsibilities: [
          "Research on new algorithms based on ANN and Galois Fields.",
          "Lectured Python 3 and MSSQL to 250+ students across 10 courses.",
          "Developed research-based material for undergraduate engineers."
        ],
        environment: ["Python 3", "MSSQL", "PyCharm", "Neural Networks", "Cryptography"]
      }
    ]
  },
  {
    company: "Black Duck (Startup)",
    location: "Antofagasta, Chile",
    totalPeriod: "Mar 2018 - May 2019",
    projects: [
      {
        title: "DS UCN Management System",
        client: "UCN Department of Services",
        role: "Founder",
        duration: "Mar'18 - May'19",
        description: "Startup delivering MVC microservices systems and catastrophe prevention monitoring.",
        responsibilities: ["Managed 12 developers", "Settled tech structure (Python/Django & .NET Core)", "Business requirements analysis."],
        environment: ["Python 3", "Django", ".NET Core 2.0", "OpenCV", "JavaScript"]
      }
    ]
  },
  {
    company: "Banco de Credito e Inversiones (BCI)",
    location: "Antofagasta, Chile",
    totalPeriod: "Sept 2012 - Aug 2017",
    projects: [
      {
        title: "Retail Consulting",
        client: "BCI",
        role: "Transactional Banking Technician",
        duration: "Sept'12 - Aug'17",
        description: "Consulting and customer loyalty of large, medium, and enterprising companies for the bank",
        responsibilities: [
          "Java and J2EE code development for banking modules.",
          "Analyzed and designed the business requirements to be documented and implemented",
          "Engaged in code development as per the requirements using Java and J2EE",
          "Checked/ performed unit testing for each of the developed modules."
        ],
        environment: ["Java", "J2EE", "MS SQL Server", "SOAP Web Services", "JPA"]
      }
    ]
  }
];