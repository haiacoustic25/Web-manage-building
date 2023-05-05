import { Tooltip } from "antd";
import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "../../assets/styles/AvatarPicker.scss";
import AvatarDefault from "../../assets/img/avatarDefault.jpg";
import { BASE_URL_AVT } from "../../constants/config";

type AvatarPickerProps = {
	width: number;
	height?: number;
	className?: string;
	value1?: any;
	type?: "default" | "circle";
	isImgDefault?: boolean;
	onChangePickAvatar?: (imageList: any) => void;
};

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
	width,
	height = width,
	value1 = null,
	className,
	type = "default",
	isImgDefault = false,
	onChangePickAvatar,
}: AvatarPickerProps) => {
	const [images, setImages] = useState([]);
	const maxNumber = 69;

	const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
		onChangePickAvatar && onChangePickAvatar(imageList[0]);
		// data for submit
		// console.log(imageList, addUpdateIndex);
		setImages(imageList as never[]);
	};

	const renderAvatar = (imageList?: any) => {
		if (images.length > 0)
			return imageList.map((image: any, index: any) => (
				<div key={index} className="avtp__wrapper--image">
					<img src={image.dataURL} alt="" width={`${width}px`} height={`${height}px`} />
				</div>
			));
		if (value1)
			return (
				<img
					src={BASE_URL_AVT + value1}
					alt=""
					className="avtp__wrapper--avtDefault"
					width={`${width}px`}
					height={`${height}px`}
				/>
			);

		if (isImgDefault)
			return (
				<img
					src={AvatarDefault}
					alt=""
					className="avtp__wrapper--avtDefault"
					width={`${width}px`}
					height={`${height}px`}
				/>
			);

		return;
	};
	const typeAvatar = (type: string) => {
		if (type === "circle") return "circle";

		return "default";
	};
	return (
		<ImageUploading
			// multiple
			value={images}
			onChange={onChange}
			maxNumber={maxNumber}
		>
			{({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
				// write your building UI
				<div className={`avtp__wrapper ${className}`}>
					<div
						className={`avtp__wrapper--container ${typeAvatar(type)}`}
						style={{ width: `${width}px`, height: `${height}px` }}
					>
						<div className="avtp__wrapper--icon hasImg">
							<Tooltip title={value1 ? "Sửa avatar" : "Thêm avatar"}>
								<EditOutlined
									style={{
										cursor: "pointer",
										color: "#333333",
										fontSize: "20px",
									}}
									onClick={onImageUpload}
									{...dragProps}
								/>
							</Tooltip>
							{images.length > 0 && (
								<Tooltip title="Xóa">
									<DeleteOutlined
										style={{
											cursor: "pointer",
											color: "#333333",
											fontSize: "20px",
										}}
										onClick={() => {
											onImageRemove(0);
										}}
									/>
								</Tooltip>
							)}
						</div>

						{renderAvatar(imageList)}
					</div>
				</div>
			)}
		</ImageUploading>
	);
};
