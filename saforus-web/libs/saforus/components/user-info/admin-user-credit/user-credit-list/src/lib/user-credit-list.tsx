import UserCreditListView from './view';
import { usePagingUserCreditsData } from './data';

function UserCreditList() {
  const { onPageChange, listLoading, userCredits, total } =
    usePagingUserCreditsData();
  return (
    <UserCreditListView
      onPageChange={onPageChange}
      userCredits={userCredits}
      total={total}
      listLoading={listLoading}
    />
  );
}

export default UserCreditList;
