export const mockServiceUsage = {
  numberOfProcessingFilesData: {
    totalNumber: 10,
    specificNumber: 15,
    unit: 'total',
    percent: 0,
  },
  fileStorageCapacityData: {
    totalNumber: 20,
    specificNumber: 10,
    unit: 'GB',
    percent: 0,
  },
  forensicWatermarkingData: {
    total: 0,
    inQueue: 20,
    inProgress: 0,
    completed: 0,
    failed: 0,
  },
  piracyDetectionData: {
    total: 30,
    inQueue: 0,
    inProgress: 30,
    completed: 0,
    failed: 0,
  },
  contentPackagingData: {
    total: 10,
    inQueue: 0,
    inProgress: 10,
    completed: 0,
    failed: 0,
  },
  drmLicenseData: {
    total: 0,
  },
};

export const mockData = {
  YEARLY: [
    {
      year: 2020,
      'Forensic Watermarking for Distribution': 100,
      'Content Packaging': 200,
      'Piracy Detection': 300,
    },
    {
      year: 2021,
      'Forensic Watermarking for Distribution': 150,
      'Content Packaging': 250,
      'Piracy Detection': 350,
    },
    {
      year: 2022,
    },
    {
      year: 2023,
    },

    {
      year: 2024,
    },
    {
      year: 2025,
    },
  ],
  MONTHLY: [
    {
      month: 1,
      'Forensic Watermarking for Distribution': 10,
      'Content Packaging': 20,
      'Piracy Detection': 30,
    },
    {
      month: 2,
      'Forensic Watermarking for Distribution': 15,
      'Content Packaging': 25,
      'Piracy Detection': 35,
    },
    {
      month: 3,
      'Forensic Watermarking for Distribution': 15,
      'Content Packaging': 25,
      'Piracy Detection': 35,
    },
    {
      month: 4,
    },
    {
      month: 5,
    },
    {
      month: 6,
    },
    {
      month: 7,
    },
    {
      month: 8,
    },
    {
      month: 9,
    },
    {
      month: 10,
    },
    {
      month: 11,
    },
    {
      month: 12,
    },
  ],
  WEEKLY: [
    {
      day: 'Monday',
      'Forensic Watermarking for Distribution': 1,
      'Content Packaging': 2,
      'Piracy Detection': 3,
    },
    {
      day: 'Tuesday',
      'Forensic Watermarking for Distribution': 2,
      'Content Packaging': 4,
      'Piracy Detection': 6,
    },
    {
      day: 'Wednesday',
    },
    {
      day: 'Thursday',
    },
    {
      day: 'Friday',
    },
    {
      day: 'Saturday',
    },
    {
      day: 'Sunday',
    },
  ],
};
