import { boolean, date, object, ref, string } from 'yup';

// Define a custom validator function that takes an HTML string and returns true if it has any text content, false otherwise
export const hasTextContent = (html: string) => {
  // Create a temporary DOM element and set its innerHTML to the given HTML string
  const temp = document.createElement('div');
  temp.innerHTML = html;
  // Get the text content of the element, which will ignore any HTML tags and attributes
  const text = temp.textContent;
  // Return true if the text is not empty or only whitespace, false otherwise
  return text?.trim() !== '';
};

export const validationSchema = (toggle: boolean) => {
  const baseSchema = {
    type: string().required('Type is required!'),
    summary: string().required('Summary is required!'),
    title: string()
      .required('Title is required!')
      .max(150, 'Title must be at most 150 characters'),
      description: string()
      .required("Detail is required!")
      .test("has-text-content", "Detail is required!", hasTextContent),
    isDoNotViewButtonShow: boolean(),
    isBannerShow: boolean(),
    showOnPage: string().required('Page is required!'),
  };

  const dateSchema = toggle
    ? {
        startNotice: date()
          .required('Start date cannot be blank')
          .max(ref('endNotice'), 'Start date must be before end date'),
        endNotice: date()
          .required('End date cannot be blank')
          .min(ref('startNotice'), 'End date must be after start date'),
      }
    : {
        startNotice: string(),
        endNotice: string(),
      };

  return object().shape({ ...baseSchema, ...dateSchema });
};
