import { Box, Button, Typography } from '@mui/material';
import Slogo from '../assets/slogo.svg';
import TextEditor from '@web-workspace/shared/components/widgets/text-editor';
import {
  Inquiry,
  createInquiry,
  updateInquiry,
} from '@web-workspace/saforus-bo/components/customer-support/data';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import LoadingButton from '@web-workspace/shared/components/widgets/loading-button';
import BoAuthStore from '@web-workspace/shared/hooks/use-bo-auth';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { showToast } from '@web-workspace/saforus/common/utils';
import { formatDateWithLanguage } from '@web-workspace/shared/helpers/dates';
import i18next from 'i18next';
import { StatusChips } from './status-chips';
import { createPortal } from 'react-dom';

export function Reply({
  ansInquiry,
  quesInquiry,
  inquiryId,
  refetch,
  handlePreview,
  handleEditMode,
  isPreviewMode,
  isEditMode,
}: {
  ansInquiry: Inquiry | null;
  quesInquiry: Inquiry;
  inquiryId: string;
  refetch: () => void;
  handlePreview: Dispatch<SetStateAction<boolean>>;
  handleEditMode: Dispatch<SetStateAction<boolean>>;
  isPreviewMode: boolean;
  isEditMode: boolean;
}) {
  const [value, setValue] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);
  const [imageformData, setImageformData] = useState<any>();
  const { t } = useTranslation();

  const isAnswered = useMemo(() => {
    return (
      !!ansInquiry &&
      ansInquiry.status === 'ANSWERED' &&
      ansInquiry?.isPublished
    );
  }, [ansInquiry]);

  useEffect(() => {
    if (!isAnswered && !edit) {
      setValue(ansInquiry?.content ?? '');
    }
  }, [isAnswered, ansInquiry]);

  const customToolbar = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline'],
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ align: '' }, { align: 'center' }, { align: 'right' }],
          ['link'],
          ['image'],
          ['button'],
        ],
        handlers: {
          image: () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
            input.onchange = () => {
              const file = input.files![0];
              setImageformData(file);
            };
          },
        },
      },
    }),
    []
  );

  const submitForm = async ({ isDraft }: { isDraft?: boolean }) => {
    const form = new FormData();
    if (imageformData) {
      form.append('files', imageformData);
    }
    form.append('title', quesInquiry?.title);
    form.append('content', value ?? '');
    form.append('qaCategory', quesInquiry?.qaCategory);
    form.append('isOpenToTeam', 'true');
    form.append('userId', BoAuthStore.userInfo?.id);
    form.append('status', 'ANSWERED');
    form.append('conversationThreadId', quesInquiry?.conversationThreadId);
    form.append('isPublished', isDraft ? 'false' : 'true');

    let response;

    if (ansInquiry) {
      response = await updateInquiry(ansInquiry.id, form);
    } else {
      response = await createInquiry(form);
    }

    if (
      response.resultCode === 201 ||
      response.resultCode === 200 ||
      response.resultCode === 202
    ) {
      !isDraft &&
        showToast.success(`${t('boInquiry.detail.reply.create-successful')}`, {
          delay: 0,
        });
      setEdit(false);
      refetch();
    } else if (response.resultCode === 401048) {
      showToast.error(`${t('boInquiry.detail.reply.create-failed-max-file')}`, {
        delay: 0,
      });
    } else if (response.resultCode === 401049) {
      showToast.error(
        `${t('boInquiry.detail.reply.create-failed-max-file-size')}`,
        {
          delay: 0,
        }
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          mt: '1rem',
        }}
      >
        <Box
          sx={{
            height: '40px',
            width: '40px',
            borderBottom: '1px solid var(--neutral-800)',
            borderLeft: '1px solid var(--neutral-800)',
            mt: '1rem',
          }}
        ></Box>
        <Box
          sx={{
            padding: '24px',
            background: 'var(--base-white)',
            width: '100%',
            mr: '24px',
            border: '1px solid var(--neutral-700)',
            borderRadius: '8px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                height: '35px',
                width: '35px',
                borderRadius: '50%',
                border: '1px solid var(--neutral-700)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={Slogo} alt="avatar" />
            </Box>
            <Typography fontWeight={500}>SaForus Admin</Typography>
            {!isPreviewMode &&
              (isAnswered && !edit ? (
                <Button
                  variant="outlined"
                  sx={{
                    ml: 'auto',
                    border: '1px solid var(--neutral-700)',
                  }}
                  color="inherit"
                  onClick={() => {
                    setEdit(true);
                    setValue(ansInquiry?.content ?? '');
                  }}
                >
                  Edit
                </Button>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    gap: '1rem',
                    ml: 'auto',
                    position: 'absolute',
                    right: '10px',
                    top: '66px',
                    zIndex: 10,
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      ml: 'auto',
                      border: '1px solid var(--neutral-700)',
                    }}
                    color="inherit"
                    onClick={() => {
                      submitForm({
                        isDraft: true,
                      });
                    }}
                  >
                    {t('boInquiry.detail.reply.save')}
                  </Button>
                  <LoadingButton
                    sx={{
                      ml: 'auto',
                    }}
                    onClick={() => {
                      submitForm({
                        isDraft: true,
                      });
                      handlePreview(true);
                      handleEditMode(false);
                    }}
                  >
                    {t('boInquiry.detail.reply.publish')}
                  </LoadingButton>
                </Box>
              ))}
          </Box>
          <Box
            sx={{
              mt: '1rem',
              // inner css
              '& .quill .text-editor, .quill .ql-editor': {
                minHeight: '200px',
              },
              '& .quill .ql-toolbar.ql-snow': {
                padding: '15px',
              },
            }}
          >
            {(isAnswered && !edit && !isEditMode) || isPreviewMode ? (
              <Typography
                dangerouslySetInnerHTML={{
                  __html: ansInquiry?.content,
                }}
              />
            ) : (
              <TextEditor
                customModules={customToolbar}
                value={value!}
                onChange={(v) => setValue(v)}
              />
            )}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                mt: '1rem',
              }}
            >
              {!isPreviewMode ||
                (isEditMode && (
                  <Typography color={'var(--gray-25)'}>
                    {!!ansInquiry && !ansInquiry?.isPublished && 'Saved '}
                    {formatDateWithLanguage({
                      date: ansInquiry?.updatedAt,
                      language: i18next.language,
                      withSlash: true,
                      isDetail: true,
                    })}
                  </Typography>
                ))}
              {ansInquiry?.isPublished && (
                <StatusChips status={quesInquiry?.status} />
              )}
              {isPreviewMode && (
                <Typography
                  color={'var(--gray-25)'}
                  sx={{ fontSize: '15px', lineHeight: '22px', fontWeight: 400 }}
                >
                  Previewing.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      {isPreviewMode &&
        createPortal(
          <Box
            sx={{
              backgroundColor: 'var(--gray-800)',
              position: 'absolute',
              display: 'flex',
              flexDirection: 'row',
              padding: '16px 56px',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              bottom: 0,
              left: 0,
            }}
          >
            <Box flexDirection="column">
              <Typography
                sx={{
                  fontSize: '20px',
                  lineHeight: '28px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}
              >
                Previewing.
              </Typography>
              <Typography
                sx={{
                  fontSize: '20px',
                  lineHeight: '28px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}
              >
                Press the Publish button to inquiry response will be published.
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '16px',
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  ml: 'auto',
                  border: '1px solid var(--neutral-700)',
                  backgroundColor: 'var(--base-white)',
                  '&:hover': {
                    backgroundColor: 'var(--base-white)',
                  },
                }}
                onClick={() => {
                  handlePreview(false);
                  handleEditMode(true);
                }}
              >
                Edit
              </Button>
              <LoadingButton
                sx={{
                  ml: 'auto',
                }}
                onClick={() => {
                  submitForm({ isDraft: false });
                  handlePreview(false);
                }}
              >
                {t('boInquiry.detail.reply.publish')}
              </LoadingButton>
            </Box>
          </Box>,
          document.getElementById('main-container')
        )}
    </>
  );
}
