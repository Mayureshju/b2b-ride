import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Animated,
    Easing,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const Sidebar = ({ isOpen, onClose }: any) => {
    const [slideAnim] = React.useState(new Animated.Value(-280)); // Start sidebar off-screen
    const router = useRouter();

    React.useEffect(() => {
        if (isOpen) {
            // Slide in animation
            Animated.timing(slideAnim, {
                toValue: 0, // Sidebar fully visible
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: false,
            }).start();
        } else {
            // Slide out animation
            Animated.timing(slideAnim, {
                toValue: -280, // Sidebar off-screen
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: false,
            }).start();
        }
    }, [isOpen]);

    const menuItems = [
        { icon: 'home', label: 'Home', path: 'captain/home' },
        { icon: 'access-time', label: 'Your Rides', path: 'captain/my-rides' },
        { icon: 'credit-card', label: 'Payments', path: '/payments' },
        { icon: 'card-giftcard', label: 'Offers', path: '/offers' },
        { icon: 'settings', label: 'Settings', path: '/settings' },
        { icon: 'help-outline', label: 'Support', path: '/support' },
    ];

    const navigateTo = (path: string) => {
        router.push(path);
        onClose(); // Close the sidebar after navigation
    };

    return (
        <Modal transparent animationType="none" visible={isOpen}>
            {/* Overlay */}
            <TouchableOpacity style={styles.overlay} onPress={onClose} />

            {/* Animated Sidebar */}
            <Animated.View style={[styles.sidebarContainer, { transform: [{ translateX: slideAnim }] }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <MaterialIcons name="close" size={24} />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileSection} onTouchEnd={() => navigateTo('/captain/profile')}>
                    <View style={styles.profileAvatar}>
                        <MaterialIcons name="person" size={24} color="#888" />
                    </View>
                    <View>
                        <Text style={styles.profileName}>John Doe</Text>
                        <Text style={styles.profileLink}>View Profile</Text>
                    </View>
                </View>
                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.label}
                        style={styles.menuItem}
                        onPress={() => navigateTo(item.path)}
                    >
                        <MaterialIcons name={item.icon} size={20} />
                        <Text style={styles.menuLabel}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>App Version 1.0.0</Text>
                </View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    sidebarContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 280,
        backgroundColor: '#fff',
        zIndex: 50,
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    closeButton: {
        padding: 8,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    profileAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    profileName: {
        fontSize: 16,
        fontWeight: '600',
    },
    profileLink: {
        fontSize: 14,
        color: '#888',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    menuLabel: {
        fontSize: 16,
        marginLeft: 16,
    },
    footer: {
        marginTop: 'auto',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    footerText: {
        fontSize: 14,
        color: '#888',
    },
});

export default Sidebar;
