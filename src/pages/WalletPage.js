import {
    Container,
    Box,
    Typography,
    Divider,
    List,
    ListItemAvatar,
    Avatar,
    Chip,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    CardHeader,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";


import CloseIcon from "@mui/icons-material/Close";
import {
    CreditCard as BankIcon, // آیکن کارت بانکی
    CurrencyBitcoin as CryptoIcon, // آیکن ارز دیجیتال
} from "@mui/icons-material";

const TransactionItem = ({ transaction }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                mb: 2,
                borderRadius: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                transition: "transform 0.2s",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                },
            }}
        >
            <CardContent sx={{ p: 2, display: "flex", alignItems: "center" }}>
                {/* آیکن وضعیت */}
                <ListItemAvatar>
                    <Avatar
                        sx={{
                            bgcolor:
                                transaction.type === "واریز"
                                    ? theme.palette.success.light
                                    : theme.palette.error.light,
                            width: 48,
                            height: 48,
                            fontSize: 24,
                        }}
                    >
                        {transaction.type === "واریز" ? "+" : "-"}
                    </Avatar>
                </ListItemAvatar>

                {/* اطلاعات تراکنش */}
                <Box sx={{ flexGrow: 1, mr: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {transaction.reason}
                    </Typography>
                    <Typography variant="body2" color="text.disabled">
                        {transaction.date}
                    </Typography>
                </Box>

                {/* مبلغ و نوع تراکنش */}
                <Box textAlign="left">
                    <Typography
                        variant="h6"
                        color={transaction.type === "واریز" ? "success.main" : "error.main"}
                    >
                        {transaction.amount} تومان
                    </Typography>
                    <Chip
                        label={transaction.type}
                        size="small"
                        sx={{
                            mt: 1,
                            bgcolor:
                                transaction.type === "واریز"
                                    ? theme.palette.success.light
                                    : theme.palette.error.light,
                            color: "white",
                            borderRadius: 1,
                            fontSize: 12,
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

const PaymentDialog = ({ open, onClose }) => {
    const [selectedMethod, setSelectedMethod] = useState("");
    const theme = useTheme();
    const navigate = useNavigate();

    const handleSelect = (event) => {
        setSelectedMethod(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedMethod === "card") {
            navigate("/wallet/increase/card");
        } else if (selectedMethod === "crypto") {
            navigate("/wallet/increase/crypto");
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                style: { borderRadius: 16, overflow: "hidden" },
            }}
        >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">انتخاب روش پرداخت</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <RadioGroup
                    value={selectedMethod}
                    onChange={handleSelect}
                    sx={{ mt: 2 }}
                >
                    {/* روش کارت به کارت */}
                    <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label={
                            <Card
                                sx={{
                                    p: 2,
                                    mb: 2,
                                    border: `2px solid ${
                                        selectedMethod === "card"
                                            ? theme.palette.primary.main
                                            : "transparent"
                                    }`,
                                    borderRadius: 2,
                                    transition: "border-color 0.3s",
                                }}
                            >
                                <CardHeader
                                    avatar={<BankIcon sx={{ fontSize: 40, color: "primary.main" }} />}
                                    title="کارت به کارت"
                                    subheader="زمان واریز: حداقل نیم ساعت"
                                    titleTypographyProps={{ variant: "subtitle1" }}
                                    subheaderTypographyProps={{ variant: "caption" }}
                                />
                            </Card>
                        }
                    />

                    {/* روش ارز دیجیتال */}
                    <FormControlLabel
                        value="crypto"
                        control={<Radio />}
                        label={
                            <Card
                                sx={{
                                    p: 2,
                                    border: `2px solid ${
                                        selectedMethod === "crypto"
                                            ? theme.palette.success.main
                                            : "transparent"
                                    }`,
                                    borderRadius: 2,
                                    transition: "border-color 0.3s",
                                }}
                            >
                                <CardHeader
                                    avatar={<CryptoIcon sx={{ fontSize: 40, color: "success.main" }} />}
                                    title="پرداخت با ارز دیجیتال"
                                    subheader="واریز آنی + 5% شارژ بیشتر"
                                    titleTypographyProps={{ variant: "subtitle1" }}
                                    subheaderTypographyProps={{ variant: "caption" }}
                                />
                            </Card>
                        }
                    />
                </RadioGroup>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={!selectedMethod}
                    sx={{
                        mt: 3,
                        bgcolor: selectedMethod ? "primary.main" : "grey.300",
                        "&:disabled": { bgcolor: "grey.300" },
                    }}
                >
                    ادامه
                </Button>
            </DialogContent>
        </Dialog>
    );
};

const WalletPage = () => {
    const theme = useTheme();
    const [transactions, setTransactions] = useState([]);

    // اضافه کردن state برای دیالوگ
    const [paymentOpen, setPaymentOpen] = useState(false);

    // دادههای ساختگی تراکنشها
    useEffect(() => {
        setTransactions([
            {
                id: 1,
                amount: "50,000",
                date: "1403/02/15",
                type: "واریز",
                reason: "خرید سرویس 6 ماهه",
            },
            {
                id: 2,
                amount: "20,000",
                date: "1403/02/14",
                type: "برداشت",
                reason: "تسویه حساب",
            },
            {
                id: 3,
                amount: "10,000",
                date: "1403/02/13",
                type: "واریز",
                reason: "پاداش معرفی",
            },
            {
                id: 3,
                amount: "10,000",
                date: "1403/02/13",
                type: "واریز",
                reason: "پاداش معرفی",
            },
            {
                id: 3,
                amount: "10,000",
                date: "1403/02/13",
                type: "واریز",
                reason: "پاداش معرفی",
            },
            {
                id: 3,
                amount: "10,000",
                date: "1403/02/13",
                type: "واریز",
                reason: "پاداش معرفی",
            },
        ]);
    }, []);

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {/* بخش موجودی کیف پول */}
            <Box textAlign="center" mb={4}>
                <AccountBalanceWalletIcon
                    sx={{
                        fontSize: 64,
                        color: theme.palette.primary.main,
                        mb: 2,
                    }}
                />
                <Typography variant="h4" fontWeight="bold" color="primary">
                    70,000 تومان
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    موجودی قابل استفاده
                </Typography>
            </Box>

            <Divider sx={{ my: 3, opacity: 0.3 }} />


            <Button
                variant="contained"
                fullWidth
                endIcon={<AccountBalanceWalletIcon />}
                onClick={() => setPaymentOpen(true)}
                sx={{
                    mb: 4,
                    bgcolor: "success.main",
                    "&:hover": { bgcolor: "success.dark" },
                    borderRadius: 5,
                    py: 1.5,
                }}
            >
                افزایش موجودی
            </Button>

            {/* لیست تراکنش ها */}
            <Typography variant="h6" fontWeight="bold" mb={2}>
                تراکنش های اخیر
            </Typography>

            <List sx={{ p: 0 }}>
                {transactions.map((item) => (
                    <TransactionItem key={item.id} transaction={item} />
                ))}
            </List>
            // اضافه کردن دیالوگ به صفحه
            <PaymentDialog
                open={paymentOpen}
                onClose={() => setPaymentOpen(false)}
            />
        </Container>
    );
};

export default WalletPage;