import { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    Pressable,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ── Constants ────────────────────────────────────────────────────────────────────
const TOTAL_STEPS = 5;

const AGE_GROUP_OPTIONS = ["All", "Under 10", "Under 14", "Under 16", "Under 19", "Open"];
const TURF_OPTIONS = ["All", "Turf", "Cement", "Astroturf", "Synthetic"];

const FACILITIES = [
    { id: "umpires", label: "Umpires", emoji: "🧑‍⚖️" },
    { id: "floodLights", label: "Flood Lights", emoji: "💡" },
    { id: "sightScreen", label: "Sight Screen", emoji: "🧱" },
    { id: "scorers", label: "Scorers", emoji: "📋" },
    { id: "balls", label: "Balls", emoji: "⚾" },
    { id: "cafeteria", label: "Cafeteria", emoji: "☕" },
    { id: "drinkingWater", label: "Drinking Water", emoji: "💧" },
    { id: "washrooms", label: "Washrooms", emoji: "🚻" },
    { id: "parking", label: "Parking", emoji: "🅿️" },
    { id: "practiceNets", label: "Practice Nets", emoji: "🏏" },
    { id: "pavilion", label: "Pavilion", emoji: "🏟️" },
    { id: "firstAid", label: "First Aid", emoji: "🧰" },
];

const PLACEHOLDER_IMAGES = [
    "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80",
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&q=80",
    "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&q=80",
];

// ── Types ────────────────────────────────────────────────────────────────────────
type Ground = {
    id: string;
    name: string;
    availableTurfs: string;
    numPitches: string;
    practiceNets: string;
    boundaryLength: string;
    images: string[];
};

// ── Reusable Components ──────────────────────────────────────────────────────────
function FormLabel({ label }: { label: string }) {
    return (
        <Text style={styles.label}>{label}</Text>
    );
}

function FormInput({
    value,
    onChangeText,
    placeholder,
    multiline,
    keyboardType,
    style,
}: {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    multiline?: boolean;
    keyboardType?: "default" | "numeric" | "email-address" | "phone-pad" | "url";
    style?: object;
}) {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            multiline={multiline}
            keyboardType={keyboardType}
            style={[styles.input, multiline && styles.multilineInput, style]}
        />
    );
}

function SectionCard({ children }: { children: React.ReactNode }) {
    return (
        <View style={styles.card}>
            {children}
        </View>
    );
}

function MediaSelector({ images }: { images: string[] }) {
    const [activeTab, setActiveTab] = useState<"gallery" | "photo">("gallery");
    return (
        <View>
            {/* Tab bar */}
            <View style={styles.mediaTabBar}>
                <TouchableOpacity
                    style={[styles.mediaTab, activeTab === "gallery" && styles.mediaTabActive]}
                    onPress={() => setActiveTab("gallery")}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.mediaTabText, activeTab === "gallery" && styles.mediaTabTextActive]}>
                        Gallery
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.mediaTab, activeTab === "photo" && styles.mediaTabActive]}
                    onPress={() => setActiveTab("photo")}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.mediaTabText, activeTab === "photo" && styles.mediaTabTextActive]}>
                        Take Photo
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Images */}
            {images.map((uri, index) => (
                <View key={index} style={styles.mediaImageWrapper}>
                    <Image
                        source={{ uri }}
                        style={styles.mediaImage}
                        resizeMode="cover"
                    />
                    {/* delete icon */}
                    <TouchableOpacity style={styles.mediaDeleteBtn} activeOpacity={0.7}>
                        <Ionicons name="close-circle" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

function DropdownField({
    label,
    value,
    options,
    onSelect,
}: {
    label: string;
    value: string;
    options: string[];
    onSelect: (val: string) => void;
}) {
    const [open, setOpen] = useState(false);
    return (
        <View>
            <FormLabel label={label} />
            <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setOpen(!open)}
                activeOpacity={0.8}
            >
                <Text style={styles.dropdownText}>{value}</Text>
                <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color="#6B7280" />
            </TouchableOpacity>
            {open && (
                <View style={styles.dropdownList}>
                    {options.map((opt) => (
                        <TouchableOpacity
                            key={opt}
                            style={styles.dropdownOption}
                            onPress={() => { onSelect(opt); setOpen(false); }}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.dropdownOptionText}>{opt}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

// ── Step 1: Basic Details ────────────────────────────────────────────────────────
function Step1({
    data,
    onChange,
}: {
    data: {
        academyName: string;
        description: string;
        fullAddress: string;
        city: string;
        pinCode: string;
        state: string;
        googleMapLink: string;
    };
    onChange: (key: string, value: string) => void;
}) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* Basic Details Card */}
            <SectionCard>
                <Text style={styles.sectionTitle}>Basic details</Text>

                <FormLabel label="Name of the Academy" />
                <FormInput
                    value={data.academyName}
                    onChangeText={(v) => onChange("academyName", v)}
                    placeholder="Enter academy name"
                />

                <FormLabel label="Description" />
                <FormInput
                    value={data.description}
                    onChangeText={(v) => onChange("description", v)}
                    placeholder="Enter description"
                    multiline
                />

                <FormLabel label="Full Address" />
                <FormInput
                    value={data.fullAddress}
                    onChangeText={(v) => onChange("fullAddress", v)}
                    placeholder="Enter full address"
                />

                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <FormLabel label="City" />
                        <FormInput
                            value={data.city}
                            onChangeText={(v) => onChange("city", v)}
                            placeholder="City"
                        />
                    </View>
                    <View style={styles.halfField}>
                        <FormLabel label="PIN Code" />
                        <FormInput
                            value={data.pinCode}
                            onChangeText={(v) => onChange("pinCode", v)}
                            placeholder="PIN Code"
                            keyboardType="numeric"
                        />
                    </View>
                </View>

                <FormLabel label="State" />
                <FormInput
                    value={data.state}
                    onChangeText={(v) => onChange("state", v)}
                    placeholder="State"
                />

                <FormLabel label="Google map link" />
                <FormInput
                    value={data.googleMapLink}
                    onChangeText={(v) => onChange("googleMapLink", v)}
                    placeholder="https://"
                    keyboardType="url"
                />
            </SectionCard>

            {/* Cover Media */}
            <View style={styles.mediaSectionHeader}>
                <Text style={styles.mediaSectionTitle}>Add Cover Media</Text>
            </View>
            <MediaSelector images={PLACEHOLDER_IMAGES} />
        </ScrollView>
    );
}

// ── Step 2: General Details ──────────────────────────────────────────────────────
function Step2({
    data,
    onChange,
}: {
    data: {
        headCoach: string;
        established: string;
        feesRange: string;
        startTime: string;
        endTime: string;
        ageGroup: string;
    };
    onChange: (key: string, value: string) => void;
}) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <SectionCard>
                <Text style={styles.sectionTitle}>General details</Text>

                <FormLabel label="Head Coach" />
                <FormInput
                    value={data.headCoach}
                    onChangeText={(v) => onChange("headCoach", v)}
                    placeholder="e.g. Mr. Rakesh Kumar"
                />

                <FormLabel label="Established" />
                <FormInput
                    value={data.established}
                    onChangeText={(v) => onChange("established", v)}
                    placeholder="e.g. 1998"
                    keyboardType="numeric"
                />

                <FormLabel label="Fees Range (Monthly)" />
                <FormInput
                    value={data.feesRange}
                    onChangeText={(v) => onChange("feesRange", v)}
                    placeholder="e.g. ₹2000–₹6000"
                />

                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <FormLabel label="Start time" />
                        <FormInput
                            value={data.startTime}
                            onChangeText={(v) => onChange("startTime", v)}
                            placeholder="07:00 A.M."
                        />
                    </View>
                    <View style={styles.halfField}>
                        <FormLabel label="End time" />
                        <FormInput
                            value={data.endTime}
                            onChangeText={(v) => onChange("endTime", v)}
                            placeholder="08:00 P.M."
                        />
                    </View>
                </View>

                <DropdownField
                    label="Age Groups"
                    value={data.ageGroup}
                    options={AGE_GROUP_OPTIONS}
                    onSelect={(v) => onChange("ageGroup", v)}
                />
            </SectionCard>
        </ScrollView>
    );
}

// ── Step 3: Contact Details ──────────────────────────────────────────────────────
function Step3({
    data,
    onChange,
}: {
    data: {
        phone: string;
        email: string;
        instagram: string;
        website: string;
    };
    onChange: (key: string, value: string) => void;
}) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <SectionCard>
                <Text style={styles.sectionTitle}>Contact details</Text>

                <FormLabel label="Phone" />
                <FormInput
                    value={data.phone}
                    onChangeText={(v) => onChange("phone", v)}
                    placeholder="+91 9876543210"
                    keyboardType="phone-pad"
                />

                <FormLabel label="Email" />
                <FormInput
                    value={data.email}
                    onChangeText={(v) => onChange("email", v)}
                    placeholder="cricket@india.com"
                    keyboardType="email-address"
                />

                <FormLabel label="Instagram" />
                <FormInput
                    value={data.instagram}
                    onChangeText={(v) => onChange("instagram", v)}
                    placeholder="@handle"
                />

                <FormLabel label="Website" />
                <FormInput
                    value={data.website}
                    onChangeText={(v) => onChange("website", v)}
                    placeholder="https://india.com"
                    keyboardType="url"
                />
            </SectionCard>
        </ScrollView>
    );
}

// ── Step 4: Ground Details ───────────────────────────────────────────────────────
function GroundForm({
    ground,
    onChange,
}: {
    ground: Ground;
    onChange: (key: keyof Ground, value: string) => void;
}) {
    return (
        <View>
            <FormLabel label="Name of the ground" />
            <FormInput
                value={ground.name}
                onChangeText={(v) => onChange("name", v)}
                placeholder="e.g. Square Ground One"
            />

            <DropdownField
                label="Available turfs"
                value={ground.availableTurfs}
                options={TURF_OPTIONS}
                onSelect={(v) => onChange("availableTurfs", v)}
            />

            <FormLabel label="No. of Pitches" />
            <FormInput
                value={ground.numPitches}
                onChangeText={(v) => onChange("numPitches", v)}
                placeholder="e.g. 5"
                keyboardType="numeric"
            />

            <FormLabel label="Practice Nets" />
            <FormInput
                value={ground.practiceNets}
                onChangeText={(v) => onChange("practiceNets", v)}
                placeholder="e.g. 12"
                keyboardType="numeric"
            />

            <FormLabel label="Boundary Length (Approx)" />
            <FormInput
                value={ground.boundaryLength}
                onChangeText={(v) => onChange("boundaryLength", v)}
                placeholder="e.g. 60-65 meters"
            />

            <Text style={styles.mediaSectionTitle}>Add Media</Text>
            <MediaSelector images={PLACEHOLDER_IMAGES} />
        </View>
    );
}

function Step4() {
    const [grounds, setGrounds] = useState<Ground[]>([
        {
            id: "1",
            name: "",
            availableTurfs: "All",
            numPitches: "",
            practiceNets: "",
            boundaryLength: "",
            images: PLACEHOLDER_IMAGES,
        },
    ]);

    const updateGround = (id: string, key: keyof Ground, value: string) => {
        setGrounds((prev) =>
            prev.map((g) => (g.id === id ? { ...g, [key]: value } : g))
        );
    };

    const addGround = () => {
        setGrounds((prev) => [
            ...prev,
            {
                id: String(prev.length + 1),
                name: "",
                availableTurfs: "All",
                numPitches: "",
                practiceNets: "",
                boundaryLength: "",
                images: [],
            },
        ]);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View>
                <Text style={styles.bareTitle}>Ground details</Text>

                {grounds.map((ground, idx) => (
                    <View key={ground.id}>
                        {idx > 0 && <View style={styles.groundDivider} />}
                        <GroundForm
                            ground={ground}
                            onChange={(key, value) => updateGround(ground.id, key, value)}
                        />
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.addGroundBtn}
                    onPress={addGround}
                    activeOpacity={0.7}
                >
                    <Ionicons name="add-circle-outline" size={20} color="#1D61E7" />
                    <Text style={styles.addGroundText}>Add Ground</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

// ── Step 5: Facility Details ─────────────────────────────────────────────────────
function Step5() {
    const [selected, setSelected] = useState<Record<string, boolean>>({});

    const toggle = (id: string) => {
        setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <SectionCard>
                <Text style={styles.sectionTitle}>Facility details</Text>

                {FACILITIES.map((facility, index) => (
                    <View key={facility.id}>
                        <TouchableOpacity
                            style={styles.facilityRow}
                            onPress={() => toggle(facility.id)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.facilityEmoji}>{facility.emoji}</Text>
                            <Text style={styles.facilityLabel}>{facility.label}</Text>
                            <View style={[styles.checkbox, selected[facility.id] && styles.checkboxSelected]}>
                                {selected[facility.id] && (
                                    <Ionicons name="checkmark" size={14} color="white" />
                                )}
                            </View>
                        </TouchableOpacity>
                        {index < FACILITIES.length - 1 && <View style={styles.facilityDivider} />}
                    </View>
                ))}
            </SectionCard>
        </ScrollView>
    );
}


// ── Main Component ───────────────────────────────────────────────────────────────
export default function AddAcademy() {
    const [step, setStep] = useState(1);

    // Step 1 state
    const [basicData, setBasicData] = useState({
        academyName: "",
        description: "",
        fullAddress: "",
        city: "",
        pinCode: "",
        state: "",
        googleMapLink: "",
    });

    // Step 2 state
    const [generalData, setGeneralData] = useState({
        headCoach: "",
        established: "",
        feesRange: "",
        startTime: "",
        endTime: "",
        ageGroup: "All",
    });

    // Step 3 state
    const [contactData, setContactData] = useState({
        phone: "",
        email: "",
        instagram: "",
        website: "",
    });

    const handleNext = () => {
        if (step < TOTAL_STEPS) {
            setStep((s) => s + 1);
        } else {
            // Submit
        }
    };

    const handleBack = () => {
        if (step > 1) setStep((s) => s - 1);
    };

    const buttonLabel = step === TOTAL_STEPS ? "Finish" : "Next";

    return (
        <View style={styles.container}>
            {/* Step Content */}
            <View style={styles.content}>
                {step === 1 && (
                    <Step1
                        data={basicData}
                        onChange={(key, value) =>
                            setBasicData((prev) => ({ ...prev, [key]: value }))
                        }
                    />
                )}
                {step === 2 && (
                    <Step2
                        data={generalData}
                        onChange={(key, value) =>
                            setGeneralData((prev) => ({ ...prev, [key]: value }))
                        }
                    />
                )}
                {step === 3 && (
                    <Step3
                        data={contactData}
                        onChange={(key, value) =>
                            setContactData((prev) => ({ ...prev, [key]: value }))
                        }
                    />
                )}
                {step === 4 && <Step4 />}
                {step === 5 && <Step5 />}
            </View>

            {/* Bottom button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}
                    activeOpacity={0.85}
                >
                    <Text style={styles.nextButtonText}>{buttonLabel}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// ── Styles ───────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F6FA",
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 14,
    },
    bareTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 14,
    },
    label: {
        fontSize: 12,
        color: "#6B7280",
        marginBottom: 6,
        marginTop: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        color: "#111827",
        backgroundColor: "white",
    },
    multilineInput: {
        height: 100,
        textAlignVertical: "top",
    },
    row: {
        flexDirection: "row",
        gap: 10,
    },
    halfField: {
        flex: 1,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
    },
    dropdownText: {
        fontSize: 14,
        color: "#111827",
    },
    dropdownList: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        marginTop: 4,
        backgroundColor: "white",
        overflow: "hidden",
    },
    dropdownOption: {
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    dropdownOptionText: {
        fontSize: 14,
        color: "#374151",
    },
    // Media
    mediaSectionHeader: {
        marginBottom: 2,
    },
    mediaSectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#111827",
        marginTop: 8,
        marginBottom: 12,
    },
    mediaTabBar: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 12,
        backgroundColor: "white",
    },
    mediaTab: {
        flex: 1,
        paddingVertical: 11,
        alignItems: "center",
        backgroundColor: "white",
    },
    mediaTabActive: {
        backgroundColor: "#F3F4F6",
    },
    mediaTabText: {
        fontSize: 14,
        color: "#6B7280",
        fontWeight: "500",
    },
    mediaTabTextActive: {
        color: "#111827",
        fontWeight: "600",
    },
    mediaImageWrapper: {
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 10,
        position: "relative",
    },
    mediaImage: {
        width: "100%",
        height: 160,
        borderRadius: 12,
    },
    mediaDeleteBtn: {
        position: "absolute",
        top: 8,
        right: 8,
    },
    // Ground
    groundDivider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 20,
    },
    addGroundBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 16,
    },
    addGroundText: {
        fontSize: 14,
        color: "#1D61E7",
        fontWeight: "600",
    },
    // Facilities
    facilityRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
    },
    facilityEmoji: {
        fontSize: 24,
        width: 36,
        marginRight: 12,
    },
    facilityLabel: {
        flex: 1,
        fontSize: 15,
        color: "#111827",
        fontWeight: "500",
    },
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 1.5,
        borderColor: "#D1D5DB",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    checkboxSelected: {
        backgroundColor: "#1D61E7",
        borderColor: "#1D61E7",
    },
    facilityDivider: {
        height: 1,
        backgroundColor: "#F3F4F6",
    },
    // Footer
    footer: {
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 14,
        paddingBottom: 24,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
    },
    nextButton: {
        backgroundColor: "#1D61E7",
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
    },
    nextButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
