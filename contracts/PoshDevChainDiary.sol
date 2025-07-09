// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PoshDevChainDiary {
    struct Entry {
        string text;
        uint256 timestamp;
        address author;
        bytes32 passHash;    // hash of the author‑supplied secret phrase
        bool   exists;
    }

    Entry[] private entries;

    event NewEntry(uint256 indexed id, address indexed author, uint256 timestamp, string text);
    event EntryEdited(uint256 indexed id, address indexed author, uint256 timestamp, string newText);
    event EntryDeleted(uint256 indexed id, address indexed author, uint256 timestamp);

    /* ---------- Write functions ---------- */

    function addEntry(string calldata _text, bytes32 _passHash) external {
        entries.push(Entry({
            text: _text,
            timestamp: block.timestamp,
            author: msg.sender,
            passHash: _passHash,
            exists: true
        }));
        emit NewEntry(entries.length - 1, msg.sender, block.timestamp, _text);
    }

    function editEntry(uint256 _id, string calldata _newText, bytes32 _passHash) external {
        require(_id < entries.length && entries[_id].exists, "No such entry");
        Entry storage e = entries[_id];
        require(msg.sender == e.author, "Not your entry");
        require(_passHash == e.passHash, "Wrong secret phrase");

        e.text = _newText;
        e.timestamp = block.timestamp;
        emit EntryEdited(_id, msg.sender, block.timestamp, _newText);
    }

    function deleteEntry(uint256 _id, bytes32 _passHash) external {
        require(_id < entries.length && entries[_id].exists, "No such entry");
        Entry storage e = entries[_id];
        require(msg.sender == e.author, "Not your entry");
        require(_passHash == e.passHash, "Wrong secret phrase");

        e.exists = false;         // “soft” delete to keep array indexes stable
        emit EntryDeleted(_id, msg.sender, block.timestamp);
    }

    /* ---------- Read functions ---------- */

    function getEntry(uint256 _id) external view returns (string memory, uint256, address, bool) {
        require(_id < entries.length, "No such entry");
        Entry storage e = entries[_id];
        return (e.text, e.timestamp, e.author, e.exists);
    }

    function totalEntries() external view returns (uint256) {
        return entries.length;
    }

    function getAllEntries() external view returns (Entry[] memory) {
        return entries;
    }
}
