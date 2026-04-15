export const styles = {
  wrapper: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'text.primary',
  },
  contentBox: {
    width: {
      xs: '900%',
      sm: '80%',
      md: '40%',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageHeader: {
    mb: 1,
    fontSize: 42,
    textAlign: 'center',
  },
  helloText: {
    mb: 4,
    fontSize: 14,
    color: '#d6d6d6',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    gap: 1.5,
    padding: '0 10px',
  },
  field: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      backgroundColor: 'transparent',
      '& input::placeholder': {
        color: '#9f9f9f',
        opacity: 1,
      },
      '& fieldset': {
        borderColor: '#3f3f3f',
      },
      '&:hover fieldset': {
        borderColor: '#5a5a5a',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6b6b6b',
      },
    },
  },
  submitButton: {
    mt: 2,
    alignSelf: 'center',
    minWidth: 190,
    borderRadius: 20,
    textTransform: 'uppercase',
    fontWeight: 700,
    py: 1,
  },
  forgotPassword: {
    color: '#777',
    fontSize: 12,
    mt: 2.5,
    width: '100%',
    textAlign: 'center',
    border: 0,
    background: 'transparent',
    p: 0,
    cursor: 'pointer',
  },
  passwordVisibilityButton: {
    color: '#dadada',
    p: 0.5,
    minWidth: 'unset',
  },
  passwordVisibilityIcon: {
    fontSize: 12,
    lineHeight: 1,
  },
};
