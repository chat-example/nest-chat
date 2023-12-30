export class UserDTO {
  id: bigint;
  nickname: string;

  static from({ id, nickname }: { id: bigint; nickname: string }) {
    const dto = new UserDTO();

    dto.id = id;
    dto.nickname = nickname;

    return dto;
  }

  static toPlain({ id, nickname }: { id: bigint; nickname: string }) {
    return {
      id,
      nickname,
    };
  }
}
