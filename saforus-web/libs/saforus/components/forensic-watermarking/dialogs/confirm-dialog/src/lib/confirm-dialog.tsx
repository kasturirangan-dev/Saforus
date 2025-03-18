import Button from '@web-workspace/shared/components/widgets/button';
import Dialog from '@web-workspace/shared/components/widgets/dialog';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';

type WatermarkConfirmDialogProps = {
  onClose: () => void;
  title: string;
  description: string;
  onContinue: () => void;
  btnCancelText?: string;
  btnContinueText?: string;
};

const WatermarkConfirmDialog = ({
  onClose,
  onContinue,
  title,
  description,
  btnCancelText = 'Cancel',
  btnContinueText = 'Continue',
}: WatermarkConfirmDialogProps) => {
  const handleContinue = () => {
    onContinue();
    onClose();
  };
  return (
    <Dialog
      PaperProps={{
        style: {
          width: '400px',
        },
      }}
      icon={
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="alert sign">
            <path
              id="Icon"
              d="M27.2188 19.3273L26.3341 19.7935H26.3341L27.2188 19.3273ZM21.6488 8.75682L22.5335 8.29064V8.29064L21.6488 8.75682ZM10.3514 8.75683L9.46668 8.29065L10.3514 8.75683ZM4.78135 19.3273L5.66604 19.7935L4.78135 19.3273ZM17.6915 3.02782L18.1019 2.11591V2.11591L17.6915 3.02782ZM14.3086 3.02782L14.719 3.93973V3.93973L14.3086 3.02782ZM27.6644 27.3236L28.2173 28.1568H28.2173L27.6644 27.3236ZM29.3069 24.8019L28.3188 24.648L29.3069 24.8019ZM4.33581 27.3236L3.78284 28.1568H3.78284L4.33581 27.3236ZM2.69331 24.8019L3.68141 24.6481L2.69331 24.8019ZM17.0001 11.9954C16.9976 11.4431 16.5479 10.9974 15.9956 10.9998C15.4433 11.0023 14.9976 11.452 15.0001 12.0043L17.0001 11.9954ZM15.03 18.6709C15.0325 19.2232 15.4822 19.6689 16.0345 19.6664C16.5868 19.6639 17.0325 19.2142 17.03 18.6619L15.03 18.6709ZM17.0001 22.6665C17.0001 22.1142 16.5524 21.6665 16.0001 21.6665C15.4478 21.6665 15.0001 22.1142 15.0001 22.6665H17.0001ZM15.0001 22.6798C15.0001 23.2321 15.4478 23.6798 16.0001 23.6798C16.5524 23.6798 17.0001 23.2321 17.0001 22.6798H15.0001ZM10.4301 28.9998H21.5701V26.9998H10.4301V28.9998ZM28.1035 18.8611L22.5335 8.29064L20.7641 9.223L26.3341 19.7935L28.1035 18.8611ZM9.46668 8.29065L3.89666 18.8611L5.66604 19.7935L11.2361 9.223L9.46668 8.29065ZM22.5335 8.29064C21.6339 6.5835 20.927 5.23975 20.287 4.25941C19.6526 3.28761 18.9873 2.51435 18.1019 2.11591L17.2811 3.93973C17.6259 4.09488 18.0302 4.46099 18.6123 5.35272C19.1889 6.23591 19.8456 7.47987 20.7641 9.223L22.5335 8.29064ZM11.2361 9.223C12.1546 7.47987 12.8113 6.23591 13.3878 5.35272C13.97 4.46099 14.3743 4.09488 14.719 3.93973L13.8982 2.11591C13.0129 2.51435 12.3475 3.28761 11.7131 4.25941C11.0731 5.23975 10.3662 6.58351 9.46668 8.29065L11.2361 9.223ZM18.1019 2.11591C16.7704 1.5167 15.2297 1.5167 13.8982 2.11591L14.719 3.93973C15.5285 3.57543 16.4716 3.57543 17.2811 3.93973L18.1019 2.11591ZM21.5701 28.9998C23.2434 28.9998 24.5637 29.0007 25.5905 28.9116C26.6137 28.8227 27.4957 28.6357 28.2173 28.1568L27.1114 26.4904C26.8141 26.6877 26.3408 26.8389 25.4175 26.9191C24.4977 26.9989 23.2804 26.9998 21.5701 26.9998V28.9998ZM26.3341 19.7935C27.1002 21.2473 27.6404 22.2748 27.9737 23.0844C28.308 23.8965 28.3669 24.339 28.3188 24.648L30.2949 24.9558C30.4285 24.0977 30.2 23.2387 29.8231 22.3231C29.4452 21.4051 28.8506 20.279 28.1035 18.8611L26.3341 19.7935ZM28.2173 28.1568C29.3317 27.4173 30.0913 26.2633 30.2949 24.9558L28.3188 24.648C28.205 25.3788 27.7764 26.0491 27.1114 26.4904L28.2173 28.1568ZM10.4301 26.9998C8.71976 26.9998 7.50244 26.9989 6.5827 26.9191C5.65938 26.8389 5.18606 26.6877 4.88877 26.4904L3.78284 28.1568C4.50445 28.6357 5.38648 28.8227 6.40966 28.9116C7.43644 29.0007 8.7568 28.9998 10.4301 28.9998V26.9998ZM3.89666 18.8611C3.14954 20.279 2.55491 21.4051 2.17702 22.3231C1.80015 23.2387 1.57162 24.0977 1.70522 24.9558L3.68141 24.6481C3.63328 24.339 3.69217 23.8965 4.02646 23.0844C4.35973 22.2748 4.89998 21.2473 5.66604 19.7935L3.89666 18.8611ZM4.88877 26.4904C4.22372 26.0491 3.79519 25.3788 3.68141 24.6481L1.70522 24.9558C1.90882 26.2633 2.66849 27.4173 3.78284 28.1568L4.88877 26.4904ZM15.0001 12.0043L15.03 18.6709L17.03 18.6619L17.0001 11.9954L15.0001 12.0043ZM15.0001 22.6665V22.6798H17.0001V22.6665H15.0001Z"
              fill="#F04438"
            />
          </g>
        </svg>
      }
      iconCss={{
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
      title={title}
      titleCss={{
        fontFamily: 'Noto Sans KR',
        fontWeight: 500,
        fontSize: '20px',
        lineHeight: '28px',
        textAlign: 'center',
        letterSpacing: '-0.02em',
        color: 'var(--gray-700)',
      }}
      subtitle={description.split('\n').map((line, i) => (
        <div key={i} style={{ marginTop: i > 0 ? '1.25em' : '0' }}>{line}</div>
      ))}
      subtitleCss={{
        fontFamily: 'Noto Sans KR',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        textAlign: 'center',
        letterSpacing: '-0.1px',
        color: 'var(--gray-50)',
        marginBottom: '1.5rem',
      }}
      onClose={onClose}
      footer={
        <>
          <Button
            onClick={onClose}
            fullWidth
            color="secondary"
            sx={{ mr: 2, height: 46 }}
          >
            {btnCancelText}
          </Button>
          <LoadingButton
            color="error"
            onClick={handleContinue}
            fullWidth
            sx={{ height: 46 }}
            type="submit"
          >
            {btnContinueText}
          </LoadingButton>
        </>
      }
      contentCss={{ paddingBottom: '1.5rem' }}
      dialogCss={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    />
  );
};

export default WatermarkConfirmDialog;
