import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Button,
    IconButton,
    Tooltip,
    Chip,
    useTheme,
    Divider,
    LinearProgress
} from "@mui/material";
import { Storage, Public, Update, ContentCopy } from "@mui/icons-material";
import { useEffect, useState } from "react";
import CountryFlag from 'react-country-flag';

const ServicesPage = () => {
    const theme = useTheme();
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        setServices([
            {
                id: 1,
                volume: "100GB",
                duration: "30 روزه",
                used: "65GB",
                remaining: "35GB",
                timeLeft: "15 روز",
                location: "DE",
                status: "فعال",
                options: {
                    type:{title : "نوع سرویس" , value: "معمولی"} ,
                    speed: {title : "کیفیت سرویس" , value: "پرسرعت"} ,
                    subscription: {title : "اشتراک فعال" , value: "فیلیمو"} ,
                },
                config: "config-1234",
                updateLink: "https://vpn-service.com/update/1234",
            },
            {
                id: 2,
                volume: "200GB",
                duration: "60 روزه",
                used: "180GB",
                remaining: "20GB",
                timeLeft: "5 روز",
                location: "Multi",
                status: "منقضی شده",
                options: {
                    type:{title : "نوع سرویس" , value: "شبانه"} ,
                    speed: {title : "کیفیت سرویس" , value: "استاندارد"} ,
                    subscription: {title : "اشتراک فعال" , value: "نتفلیکس"} ,
                },
                config: "config-5678",
                updateLink: "https://vpn-service.com/update/5678",
            },
        ]);
    }, []);

    const parseValue = (value) => parseInt(value.replace(/[^0-9]/g, ''));

    const getVolumeProgress = (used, remaining) => {
        const total = parseValue(used) + parseValue(remaining);
        return (parseValue(used) / total) * 100;
    };

    const getTimeProgress = (duration, timeLeft) => {
        const totalDays = parseValue(duration);
        const remainingDays = parseValue(timeLeft);
        return ((totalDays - remainingDays) / totalDays) * 100;
    };

    const handleClose = () => setSelectedService(null);

    const handleCopyConfig = (config) => {
        navigator.clipboard.writeText(config);
        alert("کانفیگ با موفقیت کپی شد!");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box textAlign="center" mb={4}>
                <Storage sx={{ fontSize: 64, color: "primary.main" }} />
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                    سرویس های من
                </Typography>
            </Box>
            <Divider sx={{ my: 3, opacity: 0.3 }} />

            <List>
                {services.map((service) => (
                    <ListItem
                        key={service.id}
                        button
                        onClick={() => setSelectedService(service)}
                        sx={{
                            bgcolor: "background.paper",
                            mb: 2,
                            borderRadius: 2,
                            p: 2,
                            boxShadow: 1,
                            transition: "transform 0.2s",
                            "&:hover": { transform: "translateY(-2px)" },
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ width: 48, height: 48 }}>
                                {service.location === "Multi" ? (
                                    <Public />
                                ) : (
                                    <CountryFlag
                                        countryCode={service.location}
                                        svg
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%'
                                        }}
                                    />
                                )}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Box display="flex" justifyContent="space-between">
                                    <Typography variant="subtitle1">
                                        {service.volume} - {service.duration}
                                    </Typography>
                                    <Chip
                                        label={service.status}
                                        color={service.status === "فعال" ? "success" : "error"}
                                        size="small"
                                    />
                                </Box>
                            }
                            secondary={
                                <Box>
                                    {/* نمایش پیشرفت حجم */}
                                    <Box mt={1}>
                                        <Typography variant="caption" color="text.secondary">
                                            مصرف حجم:
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={getVolumeProgress(service.used, service.remaining)}
                                                sx={{
                                                    height: 8,
                                                    flexGrow: 1,
                                                    mr: 1,
                                                    borderRadius: 2,
                                                    bgcolor: theme.palette.grey[200],
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: theme.palette.primary.main,
                                                    },
                                                }}
                                            />
                                            <Typography variant="caption" color="text.secondary">
                                                {`${parseValue(service.used)}GB/${service.volume}`}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* نمایش پیشرفت زمان */}
                                    <Box mt={1}>
                                        <Typography variant="caption" color="text.secondary">
                                            زمان باقیمانده:
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={getTimeProgress(service.duration, service.timeLeft)}
                                                sx={{
                                                    height: 8,
                                                    flexGrow: 1,
                                                    mr: 1,
                                                    borderRadius: 2,
                                                    bgcolor: theme.palette.grey[200],
                                                    '& .MuiLinearProgress-bar': {
                                                        bgcolor: theme.palette.secondary.main,
                                                    },
                                                }}
                                            />
                                            <Typography variant="caption" color="text.secondary">
                                                {`${parseValue(service.timeLeft)} روز باقیمانده`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            {/* دیالوگ جزئیات سرویس */}
            <Dialog
                open={!!selectedService}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                PaperProps={{ style: { borderRadius: 16 } }}
            >
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">جزئیات سرویس</Typography>
                        <IconButton onClick={handleClose}>
                            <Tooltip title="بستن">
                                <span>×</span>
                            </Tooltip>
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {selectedService && (
                        <>
                            <Box display="flex" justifyContent="space-between" mb={3}>
                                <Box>
                                    <Typography variant="h5" fontWeight="bold">
                                        {selectedService.volume}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {selectedService.duration}
                                    </Typography>
                                </Box>
                                <Avatar sx={{ width: 64, height: 64 }}>
                                    {selectedService.location === "Multi" ? (
                                        <Public />
                                    ) : (
                                        <CountryFlag
                                            countryCode={selectedService.location}
                                            svg
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    )}
                                </Avatar>
                            </Box>

                            {/* آمار پیشرفت حجم */}
                            <Box mb={3}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    مصرف حجم:
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={getVolumeProgress(selectedService.used, selectedService.remaining)}
                                        sx={{
                                            height: 12,
                                            flexGrow: 1,
                                            mr: 2,
                                            borderRadius: 4,
                                            bgcolor: theme.palette.grey[200],
                                            '& .MuiLinearProgress-bar': {
                                                bgcolor: theme.palette.primary.main,
                                            },
                                        }}
                                    />
                                    <Typography variant="body1">
                                        {`${parseValue(selectedService.used)}GB/${selectedService.volume}`}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* آمار پیشرفت زمان */}
                            <Box mb={3}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    زمان باقیمانده:
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={getTimeProgress(selectedService.duration, selectedService.timeLeft)}
                                        sx={{
                                            height: 12,
                                            flexGrow: 1,
                                            mr: 2,
                                            borderRadius: 4,
                                            bgcolor: theme.palette.grey[200],
                                            '& .MuiLinearProgress-bar': {
                                                bgcolor: theme.palette.secondary.main,
                                            },
                                        }}
                                    />
                                    <Typography variant="body1">
                                        {`${parseValue(selectedService.timeLeft)} روز باقیمانده`}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* آپشن ها */}
                            <Box mb={3}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    آپشن ها:
                                </Typography>
                                <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                                    {Object.entries(selectedService.options).map(([key, value]) => (
                                        <Chip
                                            key={value.title}
                                            label={`${value.title}: ${value.value}`}
                                            icon={<Storage fontSize="small" />}
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>
                            </Box>

                            {/* دکمه های عملیاتی */}
                            <Box display="flex" gap={2}>
                                <Button
                                    variant="contained"
                                    startIcon={<ContentCopy />}
                                    onClick={() => handleCopyConfig(selectedService.config)}
                                    fullWidth
                                >
                                    کپی کانفیگ
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<Update />}
                                    href={selectedService.updateLink}
                                    target="_blank"
                                    fullWidth
                                >
                                    آپدیت خودکار
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default ServicesPage;