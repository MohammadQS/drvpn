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
    TextField,
    IconButton,
    useTheme,
    Tooltip,
} from "@mui/material";
import { SupervisorAccount, ContentCopy } from "@mui/icons-material";
import { useEffect, useState } from "react";

const AffiliatePage = () => {
    const theme = useTheme();
    const [referralLink, setReferralLink] = useState(
        "https://vpn-service.com/signup?ref=123456"
    );
    const [copied, setCopied] = useState(false);
    const [affiliates, setAffiliates] = useState([]);

    // دادههای ساختگی زیرمجموعهها
    useEffect(() => {
        setAffiliates([
            {
                id: 1,
                name: "رضا رضایی",
                affiliateId: "AFF789012",
                registrationDate: "1403/02/15",
                points: 10,
                commission: "50,000 تومان",
            },
            {
                id: 2,
                name: "سارا احمدی",
                affiliateId: "AFF345678",
                registrationDate: "1403/02/14",
                points: 8,
                commission: "40,000 تومان",
            },
        ]);
    }, []);

    // تابع کپی کردن لینک
    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {/* بخش بالای صفحه */}
            <Box textAlign="center" mb={4}>
                <SupervisorAccount sx={{ fontSize: 64, color: "secondary.main" }} />
                <Typography variant="h5" fontWeight="bold" color="secondary.main">
                    زیرمجموعهها
                </Typography>
            </Box>

            <Divider sx={{ my: 3, opacity: 0.3 }} />

            {/* کارت لینک زیرمجموعه */}
            <Card
                sx={{
                    mb: 4,
                    borderRadius: 3,
                    boxShadow: 2,
                    border: `2px dashed ${theme.palette.secondary.light}`,
                }}
            >
                <CardContent>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        لینک دعوت شما:
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: "background.default",
                            p: 1,
                            borderRadius: 1,
                        }}
                    >
                        <TextField
                            fullWidth
                            value={referralLink}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                                readOnly: true,
                            }}
                            sx={{ mr: 1 }}
                        />
                        <Tooltip title={copied ? "کپی شد!" : "کپی لینک"}>
                            <IconButton onClick={handleCopy} color="primary">
                                <ContentCopy />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Typography variant="caption" color="text.disabled" mt={2}>
                        به ازای هر زیرمجموعه 10 امتیاز دریافت میکنید، 10% از واریزی زیرمجموعهها نیز مستقیماً به موجودی کیف پول شما اضافه میگردد
                    </Typography>
                </CardContent>
            </Card>

            {/* لیست زیرمجموعهها */}
            <Typography variant="h6" fontWeight="bold" mb={2} textAlign="right">
                لیست زیرمجموعهها
            </Typography>
            <List sx={{ maxHeight: 300, overflowY: "auto" }}>
                {affiliates.map((affiliate) => (
                    <Card key={affiliate.id} sx={{ mb: 2, borderRadius: 2 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between">
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {affiliate.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ID: {affiliate.affiliateId}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: "secondary.light" }}>
                                    <SupervisorAccount fontSize="small" />
                                </Avatar>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="body1">
                                    تاریخ ثبت نام: {affiliate.registrationDate}
                                </Typography>
                                <Box textAlign="left">
                                    <Typography variant="h6" color="primary">
                                        {affiliate.points} امتیاز
                                    </Typography>
                                    <Typography variant="body2" color="success.main">
                                        پورسانت: {affiliate.commission}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </Container>
    );
};

export default AffiliatePage;