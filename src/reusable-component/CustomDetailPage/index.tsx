import { ReactNode } from 'react';
import { PageLoading } from '../PageLoading';
import { PageLoadingFailed } from '../PageLoadingFailed';
import { LoadingStatus } from '../../data/models/interfaces';

function CustomDetailPage({
  loadingStatus,
  detail,
  onReload,
  children,
  loadingFailedBackgroundColor,
  loaderHeight,
}: {
  loadingStatus: LoadingStatus;
  detail: any;
  onReload: () => void;
  children: ReactNode;
  loadingFailedBackgroundColor?: string;
  loaderHeight?: string;
}) {
  if (loadingStatus === LoadingStatus.LOADING)
    return <PageLoading height={loaderHeight ? loaderHeight : undefined} />;

  if (loadingStatus === LoadingStatus.FAILED) {
    return (
      <PageLoadingFailed
        onReload={onReload}
        backgroundColor={
          loadingFailedBackgroundColor
            ? loadingFailedBackgroundColor
            : undefined
        }
      />
    );
  }
  if (!detail) {
    return <></>;
  }

  return <>{children}</>;
}

export default CustomDetailPage;
