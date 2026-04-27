export const styles = {
  formWrapper: {
    maxWidth: '900px',
    mx: 'auto',
    py: 4,
    px: 2,
  },
  profileInformation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pb: '40px',
  },
  formTextFieldBox: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: 2,
  },
  formStyle: {
    gap: 2.5,
  },
  submitWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submitButton: {
    borderRadius: '40px',
    width: { xs: '100%', sm: '49%' },
  },
};
