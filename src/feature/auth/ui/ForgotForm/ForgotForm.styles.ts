export const styles = {
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
