import {
    Container,
    Typography,
    Divider,
    Card,
    CardContent,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Button,
    CircularProgress,
    useTheme,
} from "@mui/material";
import { CurrencyBitcoin, AccountBalanceWallet } from "@mui/icons-material";
import { useEffect, useState } from "react";

const CryptoPaymentPage = () => {
    const theme = useTheme();
    const [network, setNetwork] = useState("");
    const [currency, setCurrency] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [confirmationTime, setConfirmationTime] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    // دادههای شبکهها و ارزهای مربوطه
    const networkOptions = [
        { value: "ethereum", label: "اتریوم", icon: "/assets/networks/ethereum.png" },
        { value: "ton", label: "TON", icon: "/assets/networks/ton.png" },
        { value: "bsc", label: "BSC", icon: "/assets/networks/bsc.png" },
        { value: "tron", label: "Tron", icon: "/assets/networks/tron.png" },
        { value: "base", label: "Base", icon: "/assets/networks/base.png" },
        { value: "sol", label: "Solana", icon: "/assets/networks/sol.png" },
    ];

    const currencyOptions = {
        ethereum: [
            { value: "eth", label: "اتریوم", icon: "/assets/currencies/eth.png" },
            { value: "usdt", label: "تتر", icon: "/assets/currencies/usdt.png" },
        ],
        ton: [
            { value: "ton", label: "TON", icon: "/assets/currencies/ton.png" },
            { value: "usdt", label: "تتر", icon: "/assets/currencies/usdt.png" },
        ],
        bsc: [
            { value: "bnb", label: "BNB", icon: "/assets/currencies/bnb.png" },
            { value: "dai", label: "DAI", icon: "/assets/currencies/dai.png" },
        ],
        tron: [
            { value: "trx", label: "TRX", icon: "/assets/currencies/trx.png" },
            { value: "usdt", label: "تتر", icon: "/assets/currencies/usdt.png" },
        ],
        base: [
            { value: "eth", label: "اتریوم", icon: "/assets/currencies/eth.png" },
            { value: "usdc", label: "USDC", icon: "/assets/currencies/usdc.png" },
        ],
        sol: [
            { value: "sol", label: "Solana", icon: "/assets/currencies/sol.png" },
            { value: "usdt", label: "تتر", icon: "/assets/currencies/usdt.png" },
        ],
    };

    const networkTimes = {
        ethereum: "2 دقیقه",
        ton: "30 ثانیه",
        bsc: "1 دقیقه",
        tron: "45 ثانیه",
        base: "1 دقیقه",
        sol: "30 ثانیه",
    };

    useEffect(() => {
        // شبیهسازی دریافت آدرس کیف پول
        if (network && currency) {
            setWalletAddress(
                `0x${Math.random().toString(36).substring(2, 15)}`
            );
            setConfirmationTime(networkTimes[network]);
        }
    }, [network, currency]);

    // دادههای ساختگی تراکنشها
    useEffect(() => {
        setTransactions([
            {
                id: 1,
                network: "ethereum",
                currency: "eth",
                amount: "2.5 ETH",
                time: "1403/02/15 14:30",
            },
            {
                id: 2,
                network: "tron",
                currency: "trx",
                amount: "5000 TRX",
                time: "1403/02/14 10:15",
            },
        ]);
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        setTransactions([]);

        setTimeout(() => {
            setTransactions([
                {
                    id: 3,
                    network: "bsc",
                    currency: "bnb",
                    amount: "1.2 BNB",
                    time: "1403/02/16 09:45",
                },
                ...transactions,
            ]);
            setLoading(false);
        }, 2000);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {/* بخش بالای صفحه */}
            <Box textAlign="center" mb={4}>
                <CurrencyBitcoin sx={{ fontSize: 64, color: "success.main" }} />
                <Typography variant="h5" fontWeight="bold" color="success.main">
                    واریز با ارزدیجیتال
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    واریزیهای ارزدیجیتال شامل 5% شارژ هدیه میباشند
                </Typography>
            </Box>

            <Divider sx={{ my: 3, opacity: 0.3 }} />
            {/* دکمه بروزرسانی */}
            <Button
                variant="outlined"
                fullWidth
                startIcon={
                    loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        <AccountBalanceWallet />
                    )
                }
                onClick={handleRefresh}
                disabled={loading}
                sx={{ mt: 4, py: 1.5, borderRadius: 5 }}
            >
                {loading ? "در حال بروزرسانی..." : "بررسی واریزی جدید"}
            </Button>
            {/* کارت انتخاب شبکه و ارز */}
            <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                    {/* انتخاب شبکه */}
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>انتخاب شبکه</InputLabel>
                        <Select
                            value={network}
                            label="انتخاب شبکه"
                            onChange={(e) => {
                                setNetwork(e.target.value);
                                setCurrency("");
                            }}
                            startAdornment={
                                network && (
                                    <img
                                        src={networkOptions.find((n) => n.value === network)?.icon}
                                        alt="network"
                                        style={{ width: 24, marginRight: 10 }}
                                    />
                                )
                            }
                        >
                            {networkOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <img
                                        src={option.icon}
                                        alt={option.label}
                                        style={{ width: 24, marginRight: 10 }}
                                    />
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* انتخاب ارز */}
                    {network && (
                        <FormControl fullWidth>
                            <InputLabel>انتخاب ارز</InputLabel>
                            <Select
                                value={currency}
                                label="انتخاب ارز"
                                onChange={(e) => setCurrency(e.target.value)}
                                startAdornment={
                                    currency && (
                                        <img
                                            src={
                                                currencyOptions[network].find(
                                                    (c) => c.value === currency
                                                )?.icon
                                            }
                                            alt="currency"
                                            style={{ width: 24, marginRight: 10 }}
                                        />
                                    )
                                }
                            >
                                {currencyOptions[network].map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        <img
                                            src={option.icon}
                                            alt={option.label}
                                            style={{ width: 24, marginRight: 10 }}
                                        />
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </CardContent>
            </Card>

            {/* نمایش آدرس کیف پول */}
            {walletAddress && (
                <Card sx={{ mb: 4, p: 2, borderRadius: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        آدرس کیف پول:
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            wordBreak: "break-all",
                            bgcolor: "background.default",
                            p: 2,
                            borderRadius: 1,
                        }}
                    >
                        {walletAddress}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        زمان تایید تراکنش: {confirmationTime}
                    </Typography>
                </Card>
            )}

            {/* لیست واریزهای اخیر */}
            <Typography variant="h6" fontWeight="bold" mb={2} textAlign="right">
                تراکنش های اخیر
            </Typography>
            <List>
                {transactions.map((tx) => (
                    <ListItem key={tx.id}>
                        <ListItemAvatar>
                            <Avatar
                                src={`/assets/networks/${tx.network}.png`}
                                alt={tx.network}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${tx.amount} (${tx.currency.toUpperCase()})`}
                            secondary={tx.time}
                        />
                    </ListItem>
                ))}
            </List>


        </Container>
    );
};

export default CryptoPaymentPage;