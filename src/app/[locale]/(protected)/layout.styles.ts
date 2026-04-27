import { DRAWER_WIDTH } from '@/shared/model/constants';

export const styles = {
  wrapper: {
    display: 'block',
    pb: { xs: '72px', md: 0 },
  },
  content: {
    ml: { xs: 0, md: DRAWER_WIDTH },
    pl: 3,
    pt: 2,
  },
};
