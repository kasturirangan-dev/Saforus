import { Box, Typography, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCallback, useState } from 'react';
import Icon from '@web-workspace/shared/components/widgets/icon';
import { CardContainer, StyledMenu } from './styled-elements';
import CardDetail from './card-detail';
import { CardInfo, PLAN_TYPE } from '@web-workspace/api-console/common/model';
import LoadingOverLayer from '@web-workspace/shared/components/widgets/loading-overlay';
import { showToast } from '@web-workspace/shared/components/widgets/toast';
import CsApiAuthStore from '@web-workspace/shared/hooks/use-csapi-auth';
import { useSnapshot } from 'valtio';
import DialogStore, {
  DialogType,
} from '@web-workspace/shared/components/dialogs/store';

const CardList = ({
  cards,
  onAddCard,
  markDefaultCard,
  deleteCard,
  loading,
}: {
  cards: CardInfo[];
  onAddCard: () => void;
  markDefaultCard: (cardId: string) => void;
  deleteCard: (cardId: string) => void;
  loading: boolean;
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(null);
  const { userInfo } = useSnapshot(CsApiAuthStore);
  const planType = userInfo?.subscription?.plan?.planType;
  const isCanceledPlan = Boolean(userInfo?.subscription?.cancelledAt);

  const handleMenuClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, card: CardInfo) => {
      setSelectedCard(card);
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleMarkDefault = () => {
    markDefaultCard(selectedCard?.id || '');
    handleClose();
  };

  const { openDialog, closeDialog } = DialogStore;
  const handleDeleteCart = () => {
    const isPaidSubscription = planType !== PLAN_TYPE.FREE && !isCanceledPlan;
    const isApiSubscription =
      planType !== PLAN_TYPE.FREE && planType !== PLAN_TYPE.BASIC;

    if (selectedCard?.isDefault && isPaidSubscription) {
      showToast.error(t('apiPaymentManagement.msg.card-default-remove'));
    } else if (selectedCard?.isDefault && isApiSubscription) {
      showToast.error(t('apiPaymentManagement.msg.card-active-remove'));
    } else {
      openDialog({
        name: DialogType.Cancel,
        props: {
          title: t('apiPaymentManagement.removeDialog.title'),
          description: t('apiPaymentManagement.removeDialog.description', {
            card: selectedCard?.cardNumber,
          }),
          leaveTitle: t('apiPaymentManagement.removeDialog.remove'),
          stayTitle: t('apiPaymentManagement.removeDialog.cancel'),
          onLeave: () => {
            deleteCard(selectedCard?.id || '');
          },
          onStay: closeDialog,
        },
      });
    }
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          minHeight: '94px',
          position: 'relative',
        }}
      >
        <LoadingOverLayer loading={loading} />

        {cards.map((card) => (
          <CardDetail key={card.id} card={card} onMenuClick={handleMenuClick} />
        ))}

        {cards.length < 3 && (
          <CardContainer
            component="button"
            sx={{
              justifyContent: 'center',
              border: '1px solid var(--neutral-750)',
              gap: '6px',
              cursor: 'pointer',
            }}
            onClick={onAddCard}
          >
            <Icon name="plus" size={20} />
            <Typography variant="body2" fontWeight={600}>
              {t('apiPaymentManagement.addCard')}
            </Typography>
          </CardContainer>
        )}
      </Box>

      {/* Card action */}
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!selectedCard?.isDefault && (
          <MenuItem onClick={handleMarkDefault}>
            {t('apiPaymentManagement.setDefault')}
          </MenuItem>
        )}
        <MenuItem sx={{ color: 'var(--red-500)' }} onClick={handleDeleteCart}>
          {t('apiPaymentManagement.delete')}
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default CardList;
