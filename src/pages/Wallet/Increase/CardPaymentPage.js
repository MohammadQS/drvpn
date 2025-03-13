import {
    Container,
    Typography,
    Card,
    CardContent,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    useTheme,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useEffect, useState } from "react";

const CardPaymentPage = () => {
    const theme = useTheme();
    const [transactions, setTransactions] = useState([]);

    // دادههای ساختگی تراکنشها
    useEffect(() => {
        setTransactions([
            {
                id: 1,
                amount: "500,000 تومان",
                date: "1403/02/15 14:30",
            },
            {
                id: 2,
                amount: "200,000 تومان",
                date: "1403/02/14 10:15",
            },
        ]);
    }, []);

    // فرمت دهی شماره کارت
    const formatCardNumber = (number) => {
        return number.match(/.{1,4}/g).join(" ");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {/* بخش بالای صفحه */}
            <Box textAlign="center" mb={4}>
                <CreditCardIcon sx={{ fontSize: 64, color: "primary.main" }} />
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                    واریز کارت به کارت
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    حداقل زمان بررسی و واریز به حساب شما 30 دقیقه میباشد
                </Typography>
            </Box>

            <Divider sx={{ my: 3, opacity: 0.3 }} />

            {/* کارت بانکی */}
            <Card
                sx={{
                    mb: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    border: `2px solid ${theme.palette.primary.light}`,
                }}
            >
                <CardContent>


                    {/* شماره کارت */}
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                            textAlign: "center",
                            letterSpacing: 4,
                            mb: 2,
                        }}
                    >
                        {formatCardNumber("5047061056820011")}
                    </Typography>

                    {/* نام بانک */}


                    {/* نام صاحب حساب */}
                    <Typography
                        variant="subtitle1"
                        sx={{ textAlign: "center", mt: 2 }}
                    >
                        بانک ملی ایران به نام همایون کله کیری
                    </Typography>
                </CardContent>
            </Card>

            {/* دکمه ثبت فیش */}
            <Button
                variant="contained"
                fullWidth
                startIcon={<CreditCardIcon />}
                sx={{
                    mb: 4,
                    bgcolor: "success.main",
                    "&:hover": { bgcolor: "success.dark" },
                    borderRadius: 5,
                    py: 1.5,
                }}

                onClick={() => alert("درحال توسعه...")}
            >
                <Typography variant="h6" fontWeight="bold" mr={2} textAlign="right">
                    ثبت فیش واریزی
                </Typography>

            </Button>

            {/* لیست واریزهای اخیر */}
            <Typography variant="h6" fontWeight="bold" mb={2} textAlign="right">
                واریزهای اخیر
            </Typography>
            <List>
                {transactions.map((tx) => (
                    <ListItem key={tx.id}>
                        <ListItemAvatar>
                            <Avatar>
                                <CreditCardIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={tx.amount}
                            secondary={tx.date}
                            primaryTypographyProps={{ fontWeight: "bold" }}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default CardPaymentPage;