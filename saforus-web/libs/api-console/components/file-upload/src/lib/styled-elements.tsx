import { styled } from '@mui/material';
import FileUpload from '@web-workspace/shared/components/widgets/file-upload';
import { InlineSvg } from '@web-workspace/shared/components/widgets/icon';

const StyledFileUpload = styled((props: any) => {
  return (
    <FileUpload
      {...props}
      uploadIcon={
        <InlineSvg width="42" height="42" viewBox="0 0 42 42" fill="none">
          <rect
            x="1"
            y="1"
            width="40"
            height="40"
            rx="20"
            stroke="inherit"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M20.25 24.3334C20.25 24.7476 20.5858 25.0834 21 25.0834C21.4142 25.0834 21.75 24.7476 21.75 24.3334H20.25ZM21.75 15.1667C21.75 14.7525 21.4142 14.4167 21 14.4167C20.5858 14.4167 20.25 14.7525 20.25 15.1667L21.75 15.1667ZM23.803 17.3637C24.0959 17.6566 24.5708 17.6566 24.8637 17.3637C25.1566 17.0708 25.1566 16.5959 24.8637 16.303L23.803 17.3637ZM21.5893 14.0893L21.0589 14.6196L21.5893 14.0893ZM20.4107 14.0893L20.9411 14.6196L20.9411 14.6196L20.4107 14.0893ZM17.1363 16.303C16.8434 16.5959 16.8434 17.0708 17.1363 17.3637C17.4292 17.6566 17.9041 17.6566 18.197 17.3637L17.1363 16.303ZM14.25 24.3334C14.25 23.9192 13.9142 23.5834 13.5 23.5834C13.0858 23.5834 12.75 23.9192 12.75 24.3334H14.25ZM29.25 24.3334C29.25 23.9192 28.9142 23.5834 28.5 23.5834C28.0858 23.5834 27.75 23.9192 27.75 24.3334H29.25ZM27.135 28.2276L26.7945 27.5593L26.7945 27.5593L27.135 28.2276ZM28.2275 27.135L28.8958 27.4755H28.8958L28.2275 27.135ZM13.7725 27.135L13.1042 27.4755L13.7725 27.135ZM14.865 28.2276L14.5245 28.8958H14.5245L14.865 28.2276ZM21.75 24.3334L21.75 15.1667L20.25 15.1667L20.25 24.3334H21.75ZM24.8637 16.303L22.1196 13.559L21.0589 14.6196L23.803 17.3637L24.8637 16.303ZM19.8804 13.559L17.1363 16.303L18.197 17.3637L20.9411 14.6196L19.8804 13.559ZM22.1196 13.559C21.5013 12.9406 20.4987 12.9406 19.8804 13.559L20.9411 14.6196C20.9736 14.5871 21.0264 14.5871 21.0589 14.6196L22.1196 13.559ZM12.75 24.3334V24.5H14.25V24.3334H12.75ZM17.5 29.25H24.5V27.75H17.5V29.25ZM29.25 24.5V24.3334H27.75V24.5H29.25ZM24.5 29.25C25.1877 29.25 25.7486 29.2506 26.2031 29.2135C26.6663 29.1756 27.0847 29.0949 27.4755 28.8958L26.7945 27.5593C26.6504 27.6327 26.4514 27.6882 26.0809 27.7185C25.7017 27.7495 25.2124 27.75 24.5 27.75V29.25ZM27.75 24.5C27.75 25.2125 27.7494 25.7017 27.7184 26.081C27.6882 26.4515 27.6327 26.6505 27.5593 26.7945L28.8958 27.4755C29.0949 27.0848 29.1756 26.6664 29.2134 26.2031C29.2506 25.7486 29.25 25.1877 29.25 24.5H27.75ZM27.4755 28.8958C28.087 28.5842 28.5842 28.087 28.8958 27.4755L27.5593 26.7945C27.3915 27.1238 27.1238 27.3915 26.7945 27.5593L27.4755 28.8958ZM12.75 24.5C12.75 25.1877 12.7494 25.7486 12.7866 26.2031C12.8244 26.6664 12.9051 27.0848 13.1042 27.4755L14.4407 26.7945C14.3673 26.6505 14.3118 26.4515 14.2816 26.081C14.2506 25.7017 14.25 25.2125 14.25 24.5H12.75ZM17.5 27.75C16.7876 27.75 16.2983 27.7495 15.9191 27.7185C15.5486 27.6882 15.3496 27.6327 15.2055 27.5593L14.5245 28.8958C14.9153 29.0949 15.3337 29.1756 15.7969 29.2135C16.2514 29.2506 16.8123 29.25 17.5 29.25V27.75ZM13.1042 27.4755C13.4158 28.087 13.913 28.5842 14.5245 28.8958L15.2055 27.5593C14.8762 27.3915 14.6085 27.1238 14.4407 26.7945L13.1042 27.4755Z"
            fill="inherit"
            stroke="none"
          />
        </InlineSvg>
      }
      browserFileStyle={{
        color: 'inherit',
        fontWeight: '500',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      }}
    />
  );
})(({ theme }) => ({
  height: '200px',

  // Border style
  border: 'none',
  backgroundImage: `url("data:image/svg+xml,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' fill='none' rx='8' ry='8' stroke='%23dae0e6' stroke-width='2' stroke-dasharray='5%205' stroke-dashoffset='8' stroke-linecap='square'/></svg>")`,

  '& svg': {
    stroke: 'var(--neutral-750)',
    fill: 'var(--gray-700)',
    transition: 'stroke 0.3s ease, fill 0.3s ease',
  },
  '&:hover, &.highlight': {
    backgroundColor: 'inherit',
    backgroundImage: `url("data:image/svg+xml,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' fill='none' rx='8' ry='8' stroke='%23574efa' stroke-width='2'  stroke-dashoffset='8' stroke-linecap='square'/></svg>")`,
    '& svg': {
      stroke: 'var(--purple-600)',
      fill: 'var(--purple-600)',
    },
  },
}));

export default StyledFileUpload;
