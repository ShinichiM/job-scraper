interface jobData {
  company: string;
  normTitle: string;
  displayTitle: string;
  extractedSalary: { max: number; min: number; type: string };
  salarySnippet: {
    currency: string;
    salaryTextFormatted: boolean;
    source: string;
    text: string;
  };
  formattedLocation: string;
  jobkey: string;
  remoteLocation: boolean;
  companyRating: number;
  companyReviewCount: number;
  viewJobLink: string;
  description: Promise<string>;
}

interface scrapeProps {
  title: string;
  location: string;
}

interface jobLinkProps {
  jobLink: string;
  domain: string;
  browser: any;
}

export { jobData, scrapeProps, jobLinkProps };
