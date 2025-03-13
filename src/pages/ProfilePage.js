import {
    Container,
    Avatar,
    Typography,
    Divider,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    Card
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import GroupsIcon from "@mui/icons-material/Groups";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const theme = useTheme();
    const [points, setPoints] = useState(250);
    const [openDialog, setOpenDialog] = useState(false);

    // دادههای ساختگی کاربر
    const userProfile = {
        name: "رضا رضایی",
        username: "reza_r",
        userId: "123456",
        avatar: "/user-avatar.jpg",
    };

    const handleConvertPoints = () => {
        // شبیهسازی تبدیل امتیاز
        const convertedAmount = Math.floor(points / 100) * 10000;
        alert(
            `تبدیل موفق! ${convertedAmount.toLocaleString()} تومان به کیف پول شما اضافه شد`
        );
        setPoints(points % 100);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            {/* بخش اطلاعات پروفایل */}
            <Box textAlign="center" mb={4}>
                <Avatar
                    src={userProfile.avatar}
                    alt="عکس پروفایل"
                    sx={{
                        width: 120,
                        height: 120,
                        bgcolor: "primary.main",
                        mb: 2,
                        mx: "auto",
                    }}
                >
                    {userProfile.name[0]}
                </Avatar>

                <Typography variant="h5" fontWeight="bold">
                    {userProfile.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    @{userProfile.username}
                </Typography>
                <Typography variant="body2" color="text.disabled">
                    ID: {userProfile.userId}
                </Typography>
            </Box>

            <Divider sx={{ my: 3, opacity: 0.3 }} />

            {/* بخش امتیازات */}
            <Box sx={{ position: "relative" }}>
                <Card
                    sx={{
                        bgcolor: "secondary.light",
                        color: "white",
                        p: 3,
                        borderRadius: 3,
                        boxShadow: 3,
                        cursor: "pointer",
                    }}
                    onClick={() => setOpenDialog(true)}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4" fontWeight="bold">
                            {points} امتیاز
                        </Typography>
                        <StarIcon sx={{ fontSize: 48 }} />
                    </Box>
                </Card>

                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{
                        mt: 2,
                        borderRadius: 5,
                        py: 1.5,
                        visibility: points >= 100 ? "visible" : "hidden",
                    }}
                    onClick={handleConvertPoints}
                >
                    تبدیل امتیاز به موجودی
                </Button>
            </Box>

            {/* دیالوگ اطلاعات امتیاز */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>روشهای کسب امتیاز</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <StarIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="استفاده از VPN"
                                secondary="هر گیگابایت استفاده = 1 امتیاز"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <GroupsIcon color="secondary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="زیرمجموعهگیری"
                                secondary="هر زیرمجموعه جدید = 10 امتیاز"
                            />
                        </ListItem>
                    </List>

                    <Box mt={3} p={2} bgcolor="background.default" borderRadius={2}>
                        <Typography variant="h6" textAlign="center">
                            ضریب تبدیل امتیاز:
                        </Typography>
                        <Typography variant="body1" textAlign="center" mt={1}>
                            100 امتیاز = 10,000 تومان
                        </Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default ProfilePage;