import CyanBlur from "@/assets/images/background/cyan-blur.png";
import RedBlur from "@/assets/images/background/red-blur.png";
import { varHover } from "@/components/animate/variants/action";
import { Icon } from "@/components/icon";
import { useSettingActions, useSettings } from "@/store/settingStore";
import { themeVars } from "@/theme/theme.css";
import { presetsColors } from "@/theme/tokens/color";
import { FontFamilyPreset } from "@/theme/tokens/typography";
import { Button } from "@/ui/button";
import { cn } from "@/utils";
import { LeftOutlined, QuestionCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Drawer, Slider, Switch, Tooltip } from "antd";
import { m } from "framer-motion";
import { type CSSProperties, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdCircle } from "react-icons/md";
import screenfull from "screenfull";
import { type ThemeColorPresets, ThemeLayout, ThemeMode } from "#/enum";
/**
 * App Setting
 */
export default function SettingButton() {
	const { t } = useTranslation();
	const [drawerOpen, setDrawerOpen] = useState(false);

	const settings = useSettings();
	const {
		themeMode,
		themeColorPresets,
		themeLayout,
		themeStretch,
		breadCrumb,
		multiTab,
		darkSidebar,
		fontSize,
		fontFamily,
		accordion,
	} = settings;
	const { setSettings } = useSettingActions();

	const setThemeMode = (themeMode: ThemeMode) => {
		setSettings({
			...settings,
			themeMode,
		});
	};

	const setThemeColorPresets = (themeColorPresets: ThemeColorPresets) => {
		setSettings({
			...settings,
			themeColorPresets,
		});
	};

	const setThemeLayout = (themeLayout: ThemeLayout) => {
		setSettings({
			...settings,
			themeLayout,
		});
	};

	const setThemeStretch = (themeStretch: boolean) => {
		setSettings({
			...settings,
			themeStretch,
		});
	};

	const setBreadCrumn = (checked: boolean) => {
		setSettings({
			...settings,
			breadCrumb: checked,
		});
	};

	const setMultiTab = (checked: boolean) => {
		setSettings({
			...settings,
			multiTab: checked,
		});
	};

	const setDarkSidebar = (checked: boolean) => {
		setSettings({
			...settings,
			darkSidebar: checked,
		});
	};

	const setFontFamily = (fontFamily: string) => {
		setSettings({
			...settings,
			fontFamily,
		});
	};

	const setFontSize = (fontSize: number) => {
		setSettings({
			...settings,
			fontSize,
		});
	};

	const setAccordion = (checked: boolean) => {
		setSettings({
			...settings,
			accordion: checked,
		});
	};

	const style: CSSProperties = {
		backdropFilter: "blur(20px)",
		backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
		backgroundRepeat: "no-repeat, no-repeat",
		backgroundColor: `rgba(${themeVars.colors.background.paperChannel} / 0.9)`,
		backgroundPosition: "right top, left bottom",
		backgroundSize: "50, 50%",
	};

	const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
	const toggleFullScreen = () => {
		if (screenfull.isEnabled) {
			screenfull.toggle();
			setIsFullscreen(!isFullscreen);
		}
	};

	const layoutBackground = (layout: ThemeLayout) =>
		themeLayout === layout
			? `linear-gradient(135deg, ${themeVars.colors.background.neutral} 0%, ${themeVars.colors.palette.primary.default} 100%)`
			: themeVars.colors.palette.gray[500];

	return (
		<>
			<div className="flex items-center justify-center overflow-hidden">
				<m.div
					animate={{
						rotate: [0, drawerOpen ? 0 : 360],
					}}
					transition={{
						duration: 12,
						ease: "linear",
						repeat: Number.POSITIVE_INFINITY,
					}}
					whileTap="tap"
					whileHover="hover"
					variants={varHover(1.05)}
					onClick={() => setDrawerOpen(true)}
				>
					<Button variant="ghost" size="icon" className="rounded-full">
						<Icon icon="local:ic-setting" size={24} />
					</Button>
				</m.div>
			</div>
			<Drawer
				placement="right"
				title={t("sys.settings.title")}
				onClose={() => setDrawerOpen(false)}
				open={drawerOpen}
				closable={false}
				styles={{
					body: { padding: 0 },
					mask: { backgroundColor: "transparent" },
				}}
				style={style}
				extra={
					<Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)} className="rounded-full">
						<Icon icon="lucide:x" size={20} />
					</Button>
				}
				footer={
					<Button
						variant="outline"
						className="w-full border-dashed hover:border-primary hover:text-primary"
						onClick={toggleFullScreen}
					>
						<div
							className="flex items-center justify-center"
							aria-label={isFullscreen ? t("sys.settings.exitFullscreen") : t("sys.settings.fullscreen")}
						>
							{isFullscreen ? (
								<>
									<Icon icon="local:ic-settings-exit-fullscreen" />
									<span className="ml-2">{t("sys.settings.exitFullscreen")}</span>
								</>
							) : (
								<>
									<Icon icon="local:ic-settings-fullscreen" />
									<span className="ml-2">{t("sys.settings.fullscreen")}</span>
								</>
							)}
						</div>
					</Button>
				}
			>
				<div className="flex flex-col gap-6 p-6">
					{/* theme mode */}
					<div>
						<div className="mb-3 text-base font-semibold text-text-secondary">{t("sys.settings.mode")}</div>
						<div className="flex flex-row gap-4">
							<Card
								onClick={() => setThemeMode(ThemeMode.Light)}
								className="flex h-20 w-full cursor-pointer items-center justify-center"
							>
								<Icon
									icon="local:ic-settings-mode-sun"
									size="24"
									color={themeMode === ThemeMode.Light ? themeVars.colors.palette.primary.default : ""}
								/>
							</Card>
							<Card
								onClick={() => setThemeMode(ThemeMode.Dark)}
								className="flex h-20 w-full cursor-pointer items-center justify-center"
							>
								<Icon
									icon="local:ic-settings-mode-moon"
									size="24"
									color={themeMode === ThemeMode.Dark ? themeVars.colors.palette.primary.default : ""}
								/>
							</Card>
						</div>
					</div>

					{/* theme layout */}
					<div>
						<div className="mb-3 text-base font-semibold text-text-secondary">{t("sys.settings.layout")}</div>
						<div className="grid grid-cols-3 gap-4">
							<Card
								onClick={() => setThemeLayout(ThemeLayout.Vertical)}
								className="h-16 cursor-pointer"
								style={{ flexGrow: 1, flexShrink: 0 }}
								styles={{
									body: {
										padding: 0,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "100%",
									},
								}}
							>
								<div className="flex h-full w-7 shrink-0 flex-col gap-1 p-1">
									<div
										className="h-2 w-2 shrink-0 rounded"
										style={{
											background: layoutBackground(ThemeLayout.Vertical),
										}}
									/>
									<div
										className="h-1 w-full shrink-0 rounded opacity-50"
										style={{
											background: layoutBackground(ThemeLayout.Vertical),
										}}
									/>
									<div
										className="h-1 max-w-[12px] shrink-0 rounded opacity-20"
										style={{
											background: layoutBackground(ThemeLayout.Vertical),
										}}
									/>
								</div>
								<div className="h-full w-full flex-1 grow p-1">
									<div
										className="h-full w-full rounded opacity-20"
										style={{
											background: layoutBackground(ThemeLayout.Vertical),
										}}
									/>
								</div>
							</Card>
							<Card
								onClick={() => setThemeLayout(ThemeLayout.Horizontal)}
								className="h-16 cursor-pointer"
								style={{ flexGrow: 1, flexShrink: 0 }}
								styles={{
									body: {
										padding: 0,
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
										height: "100%",
									},
								}}
							>
								<div className="flex h-4 w-full items-center gap-1  p-1">
									<div
										className="h-2 w-2 shrink-0 rounded"
										style={{
											background: layoutBackground(ThemeLayout.Horizontal),
										}}
									/>
									<div
										className="h-1 w-4 shrink-0 rounded opacity-50"
										style={{
											background: layoutBackground(ThemeLayout.Horizontal),
										}}
									/>
									<div
										className="h-1 w-3 shrink-0 rounded opacity-20"
										style={{
											background: layoutBackground(ThemeLayout.Horizontal),
										}}
									/>
								</div>
								<div className="h-full w-full flex-1 grow p-1">
									<div
										className="h-full w-full rounded opacity-20"
										style={{
											background: layoutBackground(ThemeLayout.Horizontal),
										}}
									/>
								</div>
							</Card>
							<Card
								onClick={() => setThemeLayout(ThemeLayout.Mini)}
								className="h-16 cursor-pointer"
								style={{ flexGrow: 1, flexShrink: 0 }}
								styles={{
									body: {
										padding: 0,
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "100%",
									},
								}}
							>
								<div className="flex h-full shrink-0 flex-col gap-1 p-1">
									<div
										className="h-2 w-2 shrink-0 rounded"
										style={{ background: layoutBackground(ThemeLayout.Mini) }}
									/>
									<div
										className="h-1 w-full shrink-0 rounded opacity-50"
										style={{ background: layoutBackground(ThemeLayout.Mini) }}
									/>
									<div
										className="h-1 max-w-[12px] shrink-0 rounded opacity-20"
										style={{ background: layoutBackground(ThemeLayout.Mini) }}
									/>
								</div>
								<div className="h-full w-full flex-1 grow p-1">
									<div
										className="h-full w-full rounded opacity-20"
										style={{ background: layoutBackground(ThemeLayout.Mini) }}
									/>
								</div>
							</Card>
						</div>
					</div>

					{/* theme stretch */}
					<div>
						<div className="mb-3 text-base font-semibold text-text-secondary">
							<span className="mr-2">{t("sys.settings.stretch")}</span>
							<Tooltip title={t("sys.settings.stretchTip")}>
								<QuestionCircleOutlined />
							</Tooltip>
						</div>

						<Card
							onClick={() => setThemeStretch(!themeStretch)}
							className="flex h-20 w-full cursor-pointer items-center justify-center"
							styles={{
								body: {
									width: "50%",
									padding: 0,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								},
							}}
						>
							{themeStretch ? (
								<div
									className="flex w-full items-center justify-between"
									style={{
										color: themeVars.colors.palette.primary.default,
										transition: "width 300ms 0ms",
									}}
								>
									<LeftOutlined />
									<div className="flex grow border-b border-dashed" />
									<RightOutlined />
								</div>
							) : (
								<div
									className="flex w-1/2 items-center justify-between"
									style={{
										transition: "width 300ms 0ms",
									}}
								>
									<RightOutlined />
									<div className="grow border-b border-dashed" />
									<LeftOutlined />
								</div>
							)}
						</Card>
					</div>

					{/* theme presets */}
					<div>
						<div className="mb-3 text-base font-semibold text-text-secondary">{t("sys.settings.presetThemes")}</div>
						<div className="grid grid-cols-3 gap-x-4 gap-y-3">
							{Object.entries(presetsColors).map(([preset, color]) => (
								<Card
									key={preset}
									className="flex h-12 w-full cursor-pointer items-center justify-center"
									style={{
										backgroundColor: themeColorPresets === preset ? `${color}14` : "",
									}}
									onClick={() => setThemeColorPresets(preset as ThemeColorPresets)}
								>
									<div style={{ color: color.default }}>
										<MdCircle
											style={{
												fontSize: themeColorPresets === preset ? 24 : 12,
											}}
										/>
									</div>
								</Card>
							))}
						</div>
					</div>

					{/* font */}
					<div>
						<div className="mb-3 text-base font-semibold text-text-secondary">{t("sys.settings.font")}</div>

						<div className="my-3 text-sm font-semibold text-text-disabled">{t("sys.settings.family")}</div>
						<div className="flex flex-row gap-3">
							{Object.entries(FontFamilyPreset).map(([font, family]) => (
								<Card
									key={font}
									className="flex h-20 w-full cursor-pointer items-center justify-center"
									onClick={() => setFontFamily(family)}
								>
									<div
										className={cn(
											fontFamily === family ? "text-primary font-medium" : "text-text-disabled",
											"text-center text-lg",
										)}
									>
										<span>A</span>
										<span className="opacity-50 ml-0.5">a</span>
									</div>
									<span
										className={cn(
											fontFamily === family ? "text-text-primary font-medium" : "text-text-disabled",
											"text-sm",
										)}
									>
										{family.replace("Variable", "")}
									</span>
								</Card>
							))}
						</div>

						<div className="my-3 text-sm font-semibold text-text-disabled">{t("sys.settings.size")}</div>
						<Slider min={12} max={20} defaultValue={fontSize} onChange={setFontSize} />
					</div>

					{/* Page config */}
					<div>
						<div className="mb-3 text-base font-semibold text-text-secondary">{t("sys.settings.page")}</div>
						<div className="flex flex-col gap-2">
							<div className="flex items-center justify-between text-sm text-text-disabled">
								<div>{t("sys.settings.breadcrumb")}</div>
								<Switch size="small" checked={breadCrumb} onChange={(checked) => setBreadCrumn(checked)} />
							</div>
							<div className="flex items-center justify-between text-sm text-text-disabled">
								<div>{t("sys.settings.multiTab")}</div>
								<Switch size="small" checked={multiTab} onChange={(checked) => setMultiTab(checked)} />
							</div>
							<div className="flex items-center justify-between text-sm text-text-disabled">
								<div>{t("sys.settings.darkSidebar")}</div>
								<Switch size="small" checked={darkSidebar} onChange={(checked) => setDarkSidebar(checked)} />
							</div>
							<div className="flex items-center justify-between text-sm text-text-disabled">
								<div>{t("sys.settings.accordion")}</div>
								<Switch size="small" checked={accordion} onChange={(check) => setAccordion(check)} />
							</div>
						</div>
					</div>
				</div>
			</Drawer>
		</>
	);
}
