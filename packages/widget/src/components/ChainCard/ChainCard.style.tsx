import { Box, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

export const IconTypography = styled(Typography)(({ theme }) => ({
  color:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.common.black, 0.24)
      : alpha(theme.palette.common.white, 0.32),
  lineHeight: 0,
}));

export const ChainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: '#333',
  borderRadius: `12px`,
  border: `1px solid #333`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#333',
  borderRadius: `12px`,
  flexDirection: 'column',
  margin: 0,
  // '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
  //   transform: 'rotate(90deg)',
  // },
  '& .MuiAccordionSummary-content': {
    width: '100%',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
