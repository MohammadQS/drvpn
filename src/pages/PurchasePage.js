// src/pages/PurchasePage.js
import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Grid,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    Stack,
    Divider,
    Box,
    Alert,
    Skeleton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Store,
    AccessTime as AccessTimeIcon,
    Storage as StorageIcon,
    AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const services = [
    {
        id: 1,
        name: 'سرویس 1 ماهه 20 گیگ',
        duration: '1 ماهه',
        volume: '20 گیگ',
        price: '10000 تومان',
    },
    {
        id: 2,
        name: 'سرویس 2 ماهه 50 گیگ',
        duration: '2 ماهه',
        volume: '50 گیگ',
        price: '20000 تومان',
    },
    {
        id: 3,
        name: 'سرویس 3 ماهه 100 گیگ',
        duration: '3 ماهه',
        volume: '100 گیگ',
        price: '30000 تومان',
    },
];

const durations = ['همه', '1 ماهه', '2 ماهه', '3 ماهه'];
const volumes = ['همه', '20 گیگ', '50 گیگ', '100 گیگ'];

const FeatureItem = ({ icon, text }) => (
    <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
            flex: 1,
            justifyContent: 'center',
            py: 2,
            transition: 'all 0.3s',
            '&:hover': {
                backgroundColor: 'action.hover',
                borderRadius: 2,
            }
        }}
    >
        <Box
            sx={{
                bgcolor: 'primary.light',
                borderRadius: '50%',
                p: 1,
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {icon}
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
            {text}
        </Typography>
    </Stack>
);

const PurchasePage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [filters, setFilters] = useState({
        duration: '',
        volume: '',
    });
    const [filteredServices, setFilteredServices] = useState(services);
    const [loading, setLoading] = useState(true);
    const [walletBalance, setWalletBalance] = useState(15000);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let newFiltered = services;

        if (filters.duration) {
            newFiltered = newFiltered.filter((s) => s.duration === filters.duration);
        }

        if (filters.volume) {
            newFiltered = newFiltered.filter((s) => s.volume === filters.volume);
        }

        setFilteredServices(newFiltered);
    }, [filters]);

    const handleFilterChange = (type) => (event) => {
        setFilters({
            ...filters,
            [type]: event.target.value,
        });
    };

    const handlePurchaseClick = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleConfirmPurchase = () => {
        const servicePrice = parseInt(selectedService.price.replace(/[^0-9]/g, ''));

        if (walletBalance >= servicePrice) {
            setWalletBalance(walletBalance - servicePrice);
            setIsModalOpen(false);
            setSnackbarOpen(true);
        }
    };

    const handleAddBalance = () => {
        navigate('/wallet');
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {/* هدر مطابق صفحه سرویس های من */}
            <Box textAlign="center" mb={4}>
                <Store sx={{ fontSize: 64, color: "primary.main" }} />
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                    فروشگاه سرویس ها
                </Typography>
            </Box>
            <Divider sx={{ my: 3, opacity: 0.3 }} />

            {/* بخش فیلترها */}
            <Grid container spacing={3} mb={5}>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="duration-label">مدت زمان</InputLabel>
                        <Select
                            labelId="duration-label"
                            value={filters.duration}
                            label="مدت زمان"
                            onChange={handleFilterChange('duration')}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'primary.light',
                                },
                            }}
                        >
                            {durations.map((duration) => (
                                <MenuItem key={duration} value={duration === 'همه' ? '' : duration}>
                                    {duration}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="volume-label">حجم داده</InputLabel>
                        <Select
                            labelId="volume-label"
                            value={filters.volume}
                            label="حجم داده"
                            onChange={handleFilterChange('volume')}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'primary.light',
                                },
                            }}
                        >
                            {volumes.map((volume) => (
                                <MenuItem key={volume} value={volume === 'همه' ? '' : volume}>
                                    {volume}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {/* لیست سرویس ها */}
            {loading ? (
                <Grid container spacing={3}>
                    {[...Array(3)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ borderRadius: 3 }}>
                                <CardContent>
                                    <Skeleton variant="rectangular" height={120} />
                                    <Skeleton variant="text" height={40} />
                                    <Skeleton variant="text" height={30} />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Grid container spacing={3}>
                    {filteredServices.length === 0 ? (
                        <Grid item xs={12}>
                            <Alert severity="info" sx={{ mt: 3 }}>
                                سرویسی با این مشخصات یافت نشد!
                            </Alert>
                        </Grid>
                    ) : (
                        filteredServices.map((service) => (
                            <Grid item xs={12} sm={6} md={4} key={service.id}>
                                <Card
                                    elevation={3}
                                    sx={{
                                        borderRadius: 4,
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: theme.shadows[10],
                                        },
                                    }}
                                >
                                    <CardContent sx={{ pb: 0 }}>
                                        {/* هدر کارت با دکمه خرید */}
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ mb: 2 }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: 'primary.dark',
                                                }}
                                            >
                                                {service.name}
                                            </Typography>

                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                onClick={() => handlePurchaseClick(service)}
                                                sx={{
                                                    borderRadius: 20,
                                                    py: 1,
                                                    transition: 'all 0.3s',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)',
                                                        boxShadow: theme.shadows[4],
                                                    },
                                                }}
                                            >
                                                خرید سرویس
                                            </Button>
                                        </Stack>

                                        <Divider sx={{ mb: 3 }} />

                                        {/* مشخصات سرویس در یک ردیف */}
                                        <Stack
                                            direction="row"
                                            divider={<Divider orientation="vertical" flexItem />}
                                            spacing={2}
                                            sx={{ mt: 3 }}
                                        >
                                            <FeatureItem icon={<AccessTimeIcon />} text={service.duration} />
                                            <FeatureItem icon={<StorageIcon />} text={service.volume} />
                                            <FeatureItem icon={<AttachMoneyIcon />} text={service.price} />
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            )}

            {/* مدال تایید خرید */}
            <Dialog
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        p: 3,
                    },
                }}
            >
                <DialogTitle>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                        تایید خرید سرویس
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {selectedService && (
                        <Stack spacing={3}>
                            {/* مشخصات سرویس */}
                            <Stack spacing={1}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    نام سرویس:
                                </Typography>
                                <Typography variant="body1">{selectedService.name}</Typography>
                            </Stack>

                            <Stack spacing={1}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    مدت زمان:
                                </Typography>
                                <Typography variant="body1">{selectedService.duration}</Typography>
                            </Stack>

                            <Stack spacing={1}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    حجم:
                                </Typography>
                                <Typography variant="body1">{selectedService.volume}</Typography>
                            </Stack>

                            <Stack spacing={1}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    قیمت:
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {selectedService.price}
                                </Typography>
                            </Stack>

                            {/* موجودی کیف پول */}
                            <Stack spacing={1}>
                                <Typography variant="subtitle1" color="text.secondary">
                                    موجودی کیف پول:
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                                    {walletBalance.toLocaleString()} تومان
                                </Typography>
                            </Stack>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions sx={{ mt: 3 }}>
                    {/* دکمه های عملیاتی */}
                    {selectedService && (
                        <>
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth={isMobile}
                                onClick={() => setIsModalOpen(false)}
                                sx={{ mr: isMobile ? 0 : 2 }}
                            >
                                انصراف
                            </Button>

                            {parseInt(selectedService.price.replace(/[^0-9]/g, '')) <= walletBalance ? (
                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth={isMobile}
                                    onClick={handleConfirmPurchase}
                                >
                                    خرید و فعالسازی
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="warning"
                                    fullWidth={isMobile}
                                    onClick={handleAddBalance}
                                >
                                    افزایش موجودی
                                </Button>
                            )}
                        </>
                    )}
                </DialogActions>
            </Dialog>

            {/* اسنکبار موفقیت */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message="سرویس با موفقیت خریداری شد، میتوانید از صفحه سرویس ها اطلاعات کانفیگ خود را دریافت کنید"
                action={
                    <Button color="inherit" size="small" onClick={() => setSnackbarOpen(false)}>
                        بستن
                    </Button>
                }
            />
        </Container>
    );
};

export default PurchasePage;